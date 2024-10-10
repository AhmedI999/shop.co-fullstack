const fs = require('node:fs/promises');

export async function handler(event, context) {
    const fileContent = await fs.readFile("./backend/data/products.json");

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