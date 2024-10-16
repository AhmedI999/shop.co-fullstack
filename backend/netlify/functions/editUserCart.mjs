
import { API_PRODUCTS_FILE_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');


export async function handler(event, context) {
    try {
        const { productId, amount, chosenColors, isUpdate } = JSON.parse(event.body);

        // Validate amount
        if (!amount || amount <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid amount.' }),
            };
        }

        // Read product data
        const fileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION, 'utf-8');
        const productData = JSON.parse(fileContent);
        const product = productData.find((p) => p.id === productId);

        // Check if the product exists
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Product not found.' }),
            };
        }

        // Initialize userProductsData as an empty array
        let userProductsData = [];
        try {
            const userProductsFileContent = await fs.readFile(API_USER_CART_LOCATION, 'utf-8');
            userProductsData = JSON.parse(userProductsFileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('User cart file does not exist, creating a new one.');
                await fs.writeFile(API_USER_CART_LOCATION, JSON.stringify([]));
            } else {
                throw error;
            }
        }

        let updatedUserProducts;
        const existingProductIndex = userProductsData.findIndex((p) => p.id === product.id);

        if (!isUpdate && existingProductIndex !== -1) {
            // If it's an update, increase the existing amount
            const existingProduct = userProductsData[existingProductIndex];
            updatedUserProducts = [...userProductsData];
            updatedUserProducts[existingProductIndex] = {
                ...existingProduct,
                amount: existingProduct.amount + amount, // Incrementing amount
                details: {
                    ...existingProduct.details,
                    colors: chosenColors,
                },
            };
        } else if (existingProductIndex === -1) {
            // If the product doesn't exist, add it with the full details and amount
            updatedUserProducts = [...userProductsData, {
                ...product,
                amount,
                details: {
                    ...product.details,
                    colors: chosenColors,
                }
            }];
        } else {
            // If updating an existing product without isUpdate, just set it to the new amount
            updatedUserProducts = [...userProductsData];
            updatedUserProducts[existingProductIndex] = {
                ...existingProduct,
                amount,
                details: {
                    ...existingProduct.details,
                    colors: chosenColors,
                },
            };
        }

        // Write the updated user products back to the file
        await fs.writeFile(API_USER_CART_LOCATION, JSON.stringify(updatedUserProducts));

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




