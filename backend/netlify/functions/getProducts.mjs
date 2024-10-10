const fs = require('node:fs/promises');
const path = require('path');

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Resolve the absolute path to the products.json file
    const filePath = path.join(__dirname, 'data', 'products.json');

    try {
        const fileContent = await fs.readFile(filePath);
        const productData = JSON.parse(fileContent);

        if (!productData) {
            console.log('Data not found!');
        }

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
        console.error('Error reading the file:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', reason: error }),
        };
    }
}
