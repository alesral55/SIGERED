import express from 'express'; // En lugar de require
import cors from 'cors'; // Importar el paquete de CORS
import { handler } from './index.js'; // Asegúrate de usar '.js' al importar módulos locales

const app = express();

// Configurar CORS
app.use(cors()); // Permite CORS para todas las rutas
app.use(express.json());

app.all('*', async (req, res) => {
  const event = {
    httpMethod: req.method,
    path: req.path,
    body: JSON.stringify(req.body),
  };

  const result = await handler(event);
  res.status(result.statusCode).send(JSON.parse(result.body));
});

app.listen(3000, () => {
  console.log('Servidor local corriendo en http://localhost:3000');
  console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME);
});
