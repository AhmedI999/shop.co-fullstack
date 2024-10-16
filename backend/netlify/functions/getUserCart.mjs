import {API_USER_CART_LOCATION} from "../../../frontend/src/app/app.apiRoutes.js";

const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        // Attempt to read the user cart data from the temporary file
        let userCart = [];
        try {
            const fileContent = await fs.readFile(API_USER_CART_LOCATION, 'utf-8');
            userCart = JSON.parse(fileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Handle case where the cart file doesn't exist
                console.log('User cart file not found. Returning an empty cart.');
            } else {
                // Throw other unexpected errors
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
