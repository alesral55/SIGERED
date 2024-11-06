const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); // Importa la biblioteca uuid
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { action, archivos, idArhivosAdjuntos } = JSON.parse(event.body);

    // Verifica si se requiere guardar un archivo
    if (action === 'guardar') {
        if (!Array.isArray(archivos)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Faltan parámetros requeridos o archivos no es una lista.' }),
            };
        }

        // Genera un ID único para cada archivo
        const nuevoIdArhivosAdjuntos = uuidv4().slice(0, 30); // Corta a 30 caracteres

        // Prepara el objeto que se guardará en DynamoDB
        const item = {
            idArhivosAdjuntos: nuevoIdArhivosAdjuntos, // ID generado automáticamente
            archivos: archivos, // Asegúrate de que esto es una lista de archivos
        };

        const params = {
            TableName: 'ArchivosSIGERED',
            Item: item,
        };

        try {
            await dynamoDB.put(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Archivo guardado exitosamente.', idArhivosAdjuntos: nuevoIdArhivosAdjuntos }),
            };
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error en el servidor', error: error.message }),
            };
        }
    }

    // Verifica si se requiere consultar un archivo
    else if (action === 'consultar') {
        if (!idArhivosAdjuntos) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Falta el parámetro idArhivosAdjuntos.' }),
            };
        }

        const params = {
            TableName: 'ArchivosSIGERED',
            Key: {
                idArhivosAdjuntos: idArhivosAdjuntos,
            },
        };

        try {
            const data = await dynamoDB.get(params).promise();
            if (!data.Item) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'No se encontró el archivo con el ID proporcionado.' }),
                };
            }
            return {
                statusCode: 200,
                body: JSON.stringify(data.Item),
            };
        } catch (error) {
            console.error('Error al obtener el archivo:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error en el servidor', error: error.message }),
            };
        }
    }

    // Manejar otros casos de acción
    return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Acción no válida. Debe ser "guardar" o "consultar".' }),
    };
};
