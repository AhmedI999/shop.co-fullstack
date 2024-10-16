
import { API_PRODUCTS_FILE_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');


export async function handler(event, context) {
    try {
        // Destructure productId, amount, chosenColors, and isUpdate flag from the request body
        const { productId, amount, chosenColors, isUpdate } = JSON.parse(event.body);

        // Validate amount
        if (!amount || amount <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid amount.' }),
            };
        }

        // Read product data
        const fileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION, 'utf-8');
        const productData = JSON.parse(fileContent);
        const product = productData.find((p) => p.id === productId);

        // Check if the product exists
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Product not found.' }),
            };
        }

        // Instead of reading/writing to a user cart file, we'll prepare the response
        const updatedUserProducts = {
            productId,
            amount,
            chosenColors,
            isUpdate,
            details: {
                ...product.details,
                colors: chosenColors,
            },
        };

        // Return the updated user products so that the frontend can handle local storage
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ userProducts: updatedUserProducts }),  // Return updated cart
        };
    } catch (error) {
        console.error('Error handling the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}



