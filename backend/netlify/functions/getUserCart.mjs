import {API_USER_CART_LOCATION} from "../../../frontend/src/app/app.apiRoutes.js";

const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        let userCart = [];

        try {
            // Check if the file exists, and then read it
            const fileContent = await fs.readFile(API_USER_CART_LOCATION, 'utf-8');
            userCart = JSON.parse(fileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // The file doesn't exist, so return an empty cart.
                // This could be the first time the user accesses the cart.
                console.log('User cart file not found. Returning an empty cart.');
            } else {
                // For any other error, throw the error so it can be handled by the catch block
                throw error;
            }
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ products: userCart }),
        };
    } catch (error) {
        console.error('Error reading user cart:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
