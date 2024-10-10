const fs = require('node:fs/promises');
const path = require('path');

export async function handler(event, context) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Path assumes 'data' folder is inside the same directory as the function
    const filePath = path.join(__dirname, '../', '../', '../' ,'products.json');

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
        console.error('Error reading the file:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                reason: error
            }),
        };
    }
}
