
import { API_PRODUCTS_FILE_LOCATION, API_USER_CART_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        // Destructure productId, amount, chosenColors, and isUpdate flag from the request body
        const { productId, amount, chosenColors, isUpdate } = JSON.parse(event.body);

        // Validate amount
        if (!amount || amount <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid amount.' }),
            };
        }

        // Read product data
        const fileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION);
        const productData = JSON.parse(fileContent);
        const product = productData.find((p) => p.id === productId);

        // Check if the product exists
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Product not found.' }),
            };
        }

        // Define the path for the user cart file
        const tempUserCartPath = API_USER_CART_LOCATION;

        // Initialize userProductsData as an empty array if the file doesn't exist
        let userProductsData = [];
        try {
            const userProductsFileContent = await fs.readFile(tempUserCartPath);
            userProductsData = JSON.parse(userProductsFileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('User cart file does not exist, creating a new one.');
                await fs.writeFile(tempUserCartPath, JSON.stringify([]));
            } else {
                throw error;
            }
        }

        // Check if the product already exists in the cart
        let updatedUserProducts;
        const existingProductIndex = userProductsData.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product exists
            const existingProduct = userProductsData[existingProductIndex];
            updatedUserProducts = [...userProductsData];

            if (!isUpdate) {
                // If it's an update from the cart, set the new amount directly
                updatedUserProducts[existingProductIndex] = {
                    ...existingProduct,
                    amount: +amount,  // Set the new amount directly
                    details: {
                        ...existingProduct.details,
                        colors: chosenColors,  // Update the colors
                    },
                };
            } else {
                // If it's an add action from the store, increment the amount
                updatedUserProducts[existingProductIndex] = {
                    ...existingProduct,
                    amount: existingProduct.amount + +amount,  // Increment the amount
                    details: {
                        ...existingProduct.details,
                        colors: chosenColors,  // Update the colors
                    },
                };
            }
        } else {
            // If the product doesn't exist, add it with the full details and amount
            updatedUserProducts = [...userProductsData, {
                ...product,
                amount,
                details: {
                    ...product.details,
                    colors: chosenColors,  // Include the chosen colors
                }
            }];
        }

        // Write the updated user products back to the temporary file
        await fs.writeFile(tempUserCartPath, JSON.stringify(updatedUserProducts));

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ userProducts: updatedUserProducts }),
        };
    } catch (error) {
        console.error('Error handling the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}


