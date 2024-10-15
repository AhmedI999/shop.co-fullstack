import { API_PRODUCTS_FILE_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    if (event.httpMethod === 'DELETE') {
        try {
            // Clear the user cart by writing an empty array to the user-cart.json file
            await fs.writeFile(API_PRODUCTS_FILE_LOCATION, JSON.stringify([]));

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({ message: "Cart cleared successfully." }),
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to clear the cart." }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed." }),
        };
    }
}