const fs = require('node:fs/promises');
import {API_USER_CART_LOCATION} from '../../../frontend/src/app/app.apiRoutes.js'

export async function handler(event, context) {
    const fileContent = await fs.readFile(API_USER_CART_LOCATION);

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
}