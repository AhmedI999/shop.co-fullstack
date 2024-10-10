const fs = require('node:fs/promises');

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const path = require('path');
    const filePath = path.join(__dirname, 'data', 'products.json');
    const productData = JSON.parse(filePath);
    if (!productData) {console.log('Data not found!');}
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ products: productData }),
    };
}
