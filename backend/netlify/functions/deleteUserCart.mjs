
const fs = require('node:fs/promises');

export async function handler(event, context) {
    const productId = req.params.id;

    const userProductsFileContent = await fs.readFile("./backend/data/products.json");
    const userProductsData = JSON.parse(userProductsFileContent);

    const productIndex = userProductsData.findIndex((product) => product.id === productId);

    let updatedUserProducts = userProductsData;

    if (productIndex >= 0) {
        updatedUserProducts.splice(productIndex, 1);
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