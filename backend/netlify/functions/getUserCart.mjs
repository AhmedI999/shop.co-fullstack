
const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        // Simulate reading from local storage
        // This assumes the user cart data is sent from the frontend as part of the request
        const userCart = event.headers['user-cart'];  // This could be set in the frontend

        if (!userCart) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User cart not found.' }),
            };
        }

        // Parse the userCart data
        const parsedUserCart = JSON.parse(userCart);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ products: parsedUserCart }),
        };
    } catch (error) {
        console.error('Error processing user cart:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}

