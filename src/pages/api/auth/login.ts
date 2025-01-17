import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: { message: 'Usuário não existe!' } });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: { message: 'E-mail ou Senha incorretos' } });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: { message: 'Um erro inesperado ocorreu' } });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ error: { message: `Método ${req.method} Não Permitido` } });
  }
}
