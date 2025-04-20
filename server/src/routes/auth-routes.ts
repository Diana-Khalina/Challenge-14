import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // Ensure you have the correct path to your user model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { username }, });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate a JSON Web Token
    const secretKey = process.env.JWT_SECRET || 'defaultsecret'; // Use a secret from environment variables
    const token = jwt.sign(
      { username: user.username },
      secretKey,
      { expiresIn: '1h' } // Set token expiration time
    );

    // Send the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
