const loginPath = '/login';
const verifyPath = '/verify'; 
const healthPath = '/health';
const registerPath ='/register'
export const handler = async (event) => {
  let response;

  switch (true) {

              case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200, { message: 'health success' });
      break;
      case event.httpMethod === 'POST' && event.path === registerPath:
        //const registerBody = JSON.parse(event.body);
       // response = await registerService.register(registerBody)
       response = buildResponse(200, { message: 'register success' });
       break;
      case event.httpMethod === 'GET' && event.path === loginPath:
       // const loginBody = JSON.parse(event.body)
      //response = await loginService.login(loginBody);
      response = buildResponse(200, { message: 'login success' });
      break;
      case event.httpMethod === 'POST' && event.path === verifyPath:
        //const verifyBody = JSON.parse(event.body)
      //response = await verifyService.verify(verifyBody);
      response = buildResponse(200, { message: 'verify success' });
      break;
    default:
      response = buildResponse(404, { message: 'No se encontro el Recurso' });
  }

  return response;
}

function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  }
  