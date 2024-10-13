
import { API_PRODUCTS_FILE_LOCATION, API_USER_CART_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        const { productId, amount } = JSON.parse(event.body);  // Destructure productId and amount from the request body

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

        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Product not found.' }),
            };
        }

        // Read user cart data from temporary file
        const tempUserCartPath = '/tmp/user-cart.json';

        let userProductsData = [];
        try {
            const userProductsFileContent = await fs.readFile(tempUserCartPath);
            userProductsData = JSON.parse(userProductsFileContent);
        } catch (error) {
            // If the file doesn't exist, initialize with an empty array
            if (error.code !== 'ENOENT') {
                throw error; // Re-throw unexpected errors
            }
        }

        // Check if the product already exists in the cart
        let updatedUserProducts;
        const existingProductIndex = userProductsData.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
            // If it exists, update the amount
            const existingProduct = userProductsData[existingProductIndex];
            updatedUserProducts = [...userProductsData];
            updatedUserProducts[existingProductIndex] = {
                ...existingProduct,
                amount: existingProduct.amount + amount,  // Add new amount to existing amount
            };
        } else {
            // If it doesn't exist, add the product with the given amount
            updatedUserProducts = [...userProductsData, { ...product, amount }];
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
