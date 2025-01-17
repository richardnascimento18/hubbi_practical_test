import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ valid: false, message: 'Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
      return res
        .status(401)
        .json({ valid: false, message: 'Invalid or expired token' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
