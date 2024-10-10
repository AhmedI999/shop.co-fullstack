const fs = require('node:fs/promises');
import { API_PRODUCTS_FILE_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const filePath = API_PRODUCTS_FILE_LOCATION;


    try {
        const fileContent = await fs.readFile(filePath);
        const productData = JSON.parse(fileContent);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ products: productData }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({
                message: 'Internal Server Error',
            }),

        };
    }
}
