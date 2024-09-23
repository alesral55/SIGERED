// utils.js
export const buildResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*', // Habilitar CORS
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
        },
        body: JSON.stringify(body)
    };
};
