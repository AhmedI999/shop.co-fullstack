
import { API_PRODUCTS_FILE_LOCATION, API_USER_CART_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'
const fs = require('node:fs/promises');

export async function handler(event, context) {
    const productId = req.body.productId;

    const fileContent = await fs.readFile(API_PRODUCTS_FILE_LOCATION);
    const productData = JSON.parse(fileContent);

    const product = productData.find((place) => product.id === productId);

    const userProductsFileContent = await fs.readFile(API_USER_CART_LOCATION);
    const userProductsData = JSON.parse(userProductsFileContent);

    let updatedUserProducts = userProductsData;

    if (!userProductsData.some((p) => p.id === product.id)) {
        updatedUserProducts = [...userProductsData, product];
    }

    await fs.writeFile(
        "./data/user-products.json",
        JSON.stringify(updatedUserProducts)
    );

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ userProducts: updatedUserProducts }),
    };
}