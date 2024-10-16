import {API_USER_CART_LOCATION} from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    try {
        // Extract the product ID from the URL path
        const productId = event.path.split('/').pop();

        // Read the user cart data from the file
        const userCartFileContent = await fs.readFile(API_USER_CART_LOCATION);
        const userCartData = JSON.parse(userCartFileContent);

        // Filter out the product to be deleted
        const updatedCart = userCartData.filter(p => p.id !== productId);

        // If no changes were made (product not found), return an error
        if (userCartData.length === updatedCart.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Product not found in cart" })
            };
        }

        // Write the updated cart back to the file
        await fs.writeFile(API_USER_CART_LOCATION, JSON.stringify(updatedCart));

        // Return the updated cart
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: "Product removed", userCart: updatedCart })
        };

    } catch (error) {
        console.error("Error removing product:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
}
