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

  const { correo, nombre, metodo, mensaje } = body;


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

let mailOptions

    if(metodo==2){
      mailOptions = {
        from: process.env.Usuario,
        to: correo,
        subject: 'Correo de confirmación - NO RESPONDER -',
        html: `
          <p>Hola ${nombre},</p>
          <p>Tus datos de inscripción han sido validados correctamente. </p>
          <p>
            Recuerda que no podrás acceder al sistema sin las credenciales correctas. 
            Puedes utilizar las credenciales que se te enviaron junto al código de activación, dicha contraseña es de un solo uso. 
          </p>
          <p>Gracias por utilizar nuestros servicios.</p>
          <br>
          <p>---</p>
          <p><strong>SIGERED</strong><br>
             Sistema de Gestión de Recursos Didácticos de la Academia de Lengua de Señas de Guatemala y Multiprogramas del Benemérito Comité de Pro-Ciegos y Sordos de Guatemala</p>
          <img src="https://archivos-sigered.s3.us-east-2.amazonaws.com/LogotipoSF.png" alt="Firma SIGERED" style="width:200px; height:auto;" />
        `
      };
    }
    else if(metodo==3){
      mailOptions = {
        from: process.env.Usuario,
        to: correo,
        subject: 'Correo de rechazo - NO RESPONDER -',
        html: `
          <p>Hola ${nombre},</p>
          <p>Tus datos de inscripción han sido rechazados. </p>
          <p>
            Recuerda que debes ingresar los datos correctos. ${mensaje} 
            Puedes volver a realizar el proceso de incripcion.
          </p>
          <p>Gracias por utilizar nuestros servicios.</p>
          <br>
          <p>---</p>
          <p><strong>SIGERED</strong><br>
             Sistema de Gestión de Recursos Didácticos de la Academia de Lengua de Señas de Guatemala y Multiprogramas del Benemérito Comité de Pro-Ciegos y Sordos de Guatemala</p>
          <img src="https://archivos-sigered.s3.us-east-2.amazonaws.com/LogotipoSF.png" alt="Firma SIGERED" style="width:200px; height:auto;" />
        `
      };
    }
    else{
      mailOptions = {
        from: process.env.Usuario,
        to: correo,
        subject: 'Código de Activación - NO RESPONDER -',
        html: `
          <p>Hola ${nombre},</p>
          <p>Tu código de activación es: <strong>${codigo}</strong></p>
          <p>
            Recuerda que no podrás acceder al sistema sin las credenciales correctas. 
            Guarda estas para tu primer ingreso.
          </p>
          <ul>
            <li><strong>Correo:</strong> ${correo}</li>
            <li><strong>Contraseña:</strong> ${codigo}</li>
          </ul>
          <p>La academia te informará por este medio el estado de tu inscripción.</p>
          <p>Gracias por utilizar nuestros servicios.</p>
          <br>
          <p>---</p>
          <p><strong>SIGERED</strong><br>
             Sistema de Gestión de Recursos Didácticos de la Academia de Lengua de Señas de Guatemala y Multiprogramas del Benemérito Comité de Pro-Ciegos y Sordos de Guatemala</p>
          <img src="https://archivos-sigered.s3.us-east-2.amazonaws.com/LogotipoSF.png" alt="Firma SIGERED" style="width:200px; height:auto;" />
        `
      };
    }
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
  