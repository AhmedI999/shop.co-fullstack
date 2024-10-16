export async function handler(event, context) {
    try {
        const { productId, amount, chosenColors, isUpdate } = JSON.parse(event.body);

        // Validate amount
        if (!amount || amount <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid amount.' }),
            };
        }

        // No need to read product data or user cart data here, just pass back the updated cart
        const updatedProduct = {
            productId,
            amount,
            chosenColors,
            isUpdate,
            details: {
                colors: chosenColors,
            },
        };

        // Respond with the updated product to the frontend
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ userProducts: [updatedProduct] }),
        };
    } catch (error) {
        console.error('Error handling the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
