const fs = require('node:fs/promises');

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fileContent = await fs.readFile('./backend/data/products.json');
    const productData = JSON.parse(fileContent);
    const productId = event.queryStringParameters.id;
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
