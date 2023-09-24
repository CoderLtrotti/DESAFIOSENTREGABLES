import jwt from 'jsonwebtoken';
import passport from 'passport';

const privateKey = 'privatekey';

export const generateToken = (user) => {
    return jwt.sign(user, privateKey, { expiresIn: '1m' });
  };
  
export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Invalid authorization header' });
    }
  
   
  
    
   
   
   
   
        const token = authHeader.split(' ')[1];
    
    jwt.verify(token, privateKey, (err, credentials) => {
      if (err) {
        return res.status(401).send({ message: 'Token not valid' });
      }
  
      req.user = credentials;
      next();
    });
  };

export default { generateToken, authToken };