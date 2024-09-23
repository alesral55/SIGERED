// db.js
import sql from 'mssql';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();
const config = {
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,  
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    debug: true // Agregar esta línea
};




// Crea la conexión y maneja errores
export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos');
        return pool;
    })
    .catch(err => console.log('Error en la conexión a la base de datos: ', err));
