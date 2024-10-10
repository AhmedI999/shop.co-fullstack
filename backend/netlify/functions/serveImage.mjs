const fs = require("fs").promises;
const path = require("path");
import { API_IMAGES_LOCATION } from '../../../frontend/src/app/app.apiRoutes.js'

exports.handler = async (event) => {
    const { queryStringParameters } = event;
    const { imageName } = queryStringParameters;

    if (!imageName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Image name is required" }),
        };
    }

    const imagePath = path.join(API_IMAGES_LOCATION, imageName);

    try {
        // Check if the file exists
        await fs.access(imagePath);
        const imageBuffer = await fs.readFile(imagePath);
        const imageType = path.extname(imageName).substring(1);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": `image/${imageType}`,
            },
            body: imageBuffer.toString("base64"),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error("Error serving image:", error);
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Image not found" }),
        };
    }
};