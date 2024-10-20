const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Configurar el cliente S3
const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    },
});

exports.handler = async (event) => {
    // Manejo de CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
            },
        };
    }

    const { fileName, fileType, base64File } = JSON.parse(event.body);
    if (!fileName || !fileType || !base64File) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Faltan datos en la solicitud.' }),
        };
    }

    try {
        // Decodificar el archivo base64
        const fileBuffer = Buffer.from(base64File, 'base64');

        // Configuración para la subida a S3
        const uploadParams = {
            Bucket: 'archivos-sigered', // Cambia a tu bucket de S3
            Key: `${Date.now()}-${fileName}`,
            Body: fileBuffer,
            ContentType: fileType, // Mantener el tipo de contenido original
        };

        // Subir el archivo a S3
        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);
        const ArchivoUrl= `https://archivos-sigered.s3.us-east-2.amazonaws.com/${uploadParams.Key}`
        // Responder con la URL del archivo subido
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
            },
            body: JSON.stringify({
                message: 'Archivo subido correctamente',
                fileUrl: ArchivoUrl,
                fileName: fileName,
                fileType: fileType
            }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
            },
            body: JSON.stringify({
                message: 'Error al subir el archivo',
                error: error.message,
            }),
        };
    }
};
