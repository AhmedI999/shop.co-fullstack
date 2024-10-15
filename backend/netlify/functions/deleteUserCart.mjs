import { API_PRODUCTS_FILE_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    // Extract the product ID from the request parameters
    const productId = event.path.split('/').pop(); // Get the last part of the URL as the productId

    // Read the user cart data
    const userProductsFileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION);
    const userProductsData = JSON.parse(userProductsFileContent);

    // Find the index of the product to delete
    const productIndex = userProductsData.findIndex((product) => product.id === productId);

    // If the product is found, remove it from the array
    if (productIndex >= 0) {
        userProductsData.splice(productIndex, 1); // Remove the product
    } else {
        // Return a 404 response if the product is not found
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: "Product not found in cart." }),
        };
    }

    // Write the updated user products back to the file
    await fs.writeFile(
        API_USER_CART_FILE_LOCATION,
        JSON.stringify(userProductsData)
    );

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ message: "Product removed successfully", userProducts: userProductsData }),
    };
}