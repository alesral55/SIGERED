const nodemailer = require('nodemailer');

function generarCodigoAleatorio(longitud) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < longitud; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}


exports.handler = async (event) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };


  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Error en la estructura del body', error: err.message }),
    };
  }
  const codigo = generarCodigoAleatorio(Math.floor(Math.random() * (12 - 8 + 1)) + 8);

  const { correo, nombre } = body;


  if (!correo || !nombre || !codigo) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Faltan campos requeridos: correo, nombre o código.' }),
    };
  }


  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.Usuario , 
      pass: process.env.Contrasenia, 
    },
  });

  const mailOptions = {
    from: process.env.Usuario,
    to: correo,
    subject: 'Código de Activación',
    text: `Hola ${nombre},\n\nTu código de activación es: ${codigo}\n\nGracias por utilizar nuestros servicios.`,
  };


  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Correo enviado exitosamente.', codigo: codigo }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Error al enviar el correo', error: error.message }),
    };
  }
};
