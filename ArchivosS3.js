import { S3Client } from '@aws-sdk/client-s3'; // SDK v3
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

// Configurar AWS con tus credenciales y la región correcta
const s3 = new S3Client({
    region: 'us-east-2',  // Asegúrate de usar la región correcta de tu bucket
    credentials: {
        accessKeyId: 'tu accessKeyId',   // Reemplaza con tu Access Key
        secretAccessKey: 'tu secretAccessKey'   // Reemplaza con tu Secret Key
    }
});

// Configurar Multer para subir a S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'nombre-del-bucket', // Reemplaza con el nombre de tu bucket
        key: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            cb(null, Date.now().toString() + '-' + file.originalname); // Nombre único del archivo
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // Configura automáticamente el tipo de contenido
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        contentDisposition: (req, file, cb) => {
            // Si el archivo es un PDF, configuramos para que se visualice inline
            if (file.mimetype === 'application/pdf') {
                cb(null, 'inline');
            } else {
                cb(null, 'attachment'); // Otros tipos de archivo pueden descargarse
            }
        }
    })
});

// Función exportable para subir archivos
export async function ArchivosS3(req) {
 console.log('ingresa a la funcion');
    return new Promise((resolve, reject) => {
        upload.single('file')(req, {}, (error) => {
            if (error) {
                reject({
                    status: 500,
                    message: 'Error al subir el archivo',
                    error: error.message
                });
            } else if (!req.file) {
                reject({
                    status: 400,
                    message: 'No se ha subido ningún archivo'
                });
            } else {
                const fileUrl = req.file.location;
                resolve({
                    status: 200,
                    message: 'Archivo subido correctamente',
                    fileUrl: fileUrl
                });
            }
        });
    });
}
