import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'defaultsecret'; // Use environment variable or fallback secret
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    req.user = { username: decoded.username };
    return next(); // Add a return statement here
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

