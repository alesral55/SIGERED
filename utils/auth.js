import jwt from 'jsonwebtoken';

export function generateToken(userInfo) {
  if (!userInfo) {
    return null;
  }
  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
}

export function verifyToken(cui, token) {
  console.log('entro a la verificacion de token');
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        resolve({
          verified: false,
          message: 'TOKEN INVALIDO'
        });
      } else if (decoded.cui !== cui) {
        resolve({
          verified: false,
          message: 'Usuario Invalido'
        });
      } else {
        resolve({
          verified: true,
          message: 'verified'
        });
      }
    });
  });
}
