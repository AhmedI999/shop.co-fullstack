const fs = require('node:fs/promises');

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fileContent = await fs.readFile('./backend/data/products.json');

    const productData = JSON.parse(fileContent);
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
