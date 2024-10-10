const fs = require("fs").promises;
const path = require("path");

exports.handler = async (event) => {
    const { queryStringParameters } = event;
    const { imageName } = queryStringParameters; // Get the image name from query parameters

    if (!imageName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Image name is required" }),
        };
    }

    const imagePath = path.join("./backend/images", imageName); // Path to the images folder

    try {
        // Check if the file exists
        await fs.access(imagePath);
        const imageBuffer = await fs.readFile(imagePath); // Read the image file
        const imageType = path.extname(imageName).substring(1); // Get the file extension for MIME type

        return {
            statusCode: 200,
            headers: {
                "Content-Type": `image/${imageType}`, // Set the correct content type
            },
            body: imageBuffer.toString("base64"), // Send the image as base64
            isBase64Encoded: true, // Indicate that the response is base64 encoded
        };
    } catch (error) {
        console.error("Error serving image:", error);
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Image not found" }),
        };
    }
};