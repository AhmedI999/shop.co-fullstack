import {API_USER_CART_LOCATION} from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    if (event.httpMethod === 'DELETE') {
        try {
            // Clear the user cart by writing an empty array to the user-cart.json file
            await fs.writeFile(API_USER_CART_LOCATION, JSON.stringify([]));  // Corrected to clear the user cart

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
            console.error("Error clearing cart:", error);
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
