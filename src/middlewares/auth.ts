import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../configs/config';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    jwt.verify(token, env.JWT_SECRET);
    const userId = jwt.decode(token);
    console.log(userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }
}
