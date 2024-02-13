import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log('Auth Header:', authHeader); 
  
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  // console.log('Token received:', token); 
  // console.log("here",process.env.JWT_SECRET)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded:', decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Error verifying token:', error);
    res.status(401).send({ message: 'Failed to authenticate token' });
  }
};

export default authenticate;
