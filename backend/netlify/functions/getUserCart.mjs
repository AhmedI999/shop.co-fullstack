import {API_USER_CART_LOCATION} from "../../../frontend/src/app/app.apiRoutes.js";

const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        // Attempt to read the user cart data from the temporary file
        const fileContent = await fs.readFile(API_USER_CART_LOCATION, 'utf-8');
        const userCart = JSON.parse(fileContent);

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

        if (error.code === 'ENOENT') {
            // Handle case where the cart file doesn't exist
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User cart not found.' }),
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
