import { auth } from "@/firebase";
import { type NextFunction, type Request, type Response } from "express";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = await auth.verifyIdToken(token);
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    res.status(403).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};

export const isAuthenticated = authenticateToken;
