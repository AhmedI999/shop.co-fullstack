const fs = require('node:fs/promises');
import {API_PRODUCTS_FILE_LOCATION, API_USER_CART_LOCATION} from '../../../frontend/src/app/app.apiRoutes.js'

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION);
    const productData = JSON.parse(fileContent);

    // Extract product ID from the path
    const pathParts = event.path.split('/');
    const productId = pathParts[pathParts.length - 1];
    const product = productData.find((p) => p.id === productId);

    if (product) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ product }),
        };
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'Product not found' }),
        };
    }
}
