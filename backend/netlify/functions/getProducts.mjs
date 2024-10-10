const fs = require('node:fs/promises');
const path = require('path');
/*
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
        let taskDirContents;
        try {
            taskDirContents = await fs.readdir('/var/task/backend/netlify/functions/', { withFileTypes: true });
        } catch (dirError) {
            taskDirContents = `Error reading /var/task: ${dirError.message}`;
        }

        const files = Array.isArray(taskDirContents)
            ? taskDirContents.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
            }))
            : taskDirContents;

        // Return the error and the directory contents in the response
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({
                message: 'Internal Server Error',
                reason: error.message,
                directoryContents: files,
            }),
        };
    }
}
*/

export async function handler(event, context) {
    try {
        // Construct the path to the bundled file
        const filePath = path.join(__dirname, 'data', 'products.json');
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
                reason: error.message,
            }),
        };
    }
}
