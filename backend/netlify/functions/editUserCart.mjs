const fs = require('node:fs/promises');
import fs from 'fs/promises';
import { API_PRODUCTS_FILE_LOCATION, API_USER_CART_LOCATION } from './constants';

export async function handler(event, context) {
    try {
        const { productId, amount } = JSON.parse(event.body);

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

        // Read user cart data
        const userProductsFileContent = await fs.readFile(API_USER_CART_LOCATION);
        const userProductsData = JSON.parse(userProductsFileContent);

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
