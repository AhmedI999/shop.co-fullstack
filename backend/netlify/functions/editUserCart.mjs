

const fs = require('node:fs/promises');

export async function handler(event, context) {
    const productId = req.body.productId;

    const fileContent = await fs.readFile("./backend/data/products.json");
    const productData = JSON.parse(fileContent);

    const product = productData.find((place) => product.id === productId);

    const userProductsFileContent = await fs.readFile("../../data/user-products.json");
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