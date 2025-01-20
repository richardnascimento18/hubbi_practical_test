import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { price, sales, products, date } = req.body;
      const newPurchase = await prisma.purchase.create({
        data: {
          price,
          date: new Date(date),
          sales: { connect: sales.map((id) => ({ id })) },
          products: {
            create: products.map(({ id, quantity }) => ({
              product: { connect: { id } },
              quantity,
            })),
          },
        },
      });
      res.status(201).json(newPurchase);
    } catch (error) {
      res.status(500).json({ error: 'Falha na criação da compra.' });
    }
  } else if (method === 'GET') {
    try {
      const { page = 1, limit = 2 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const purchases = await prisma.purchase.findMany({
        skip: skip,
        take: Number(limit),
        include: {
          sales: true,
          products: { include: { product: true } },
        },
      });
      const total = await prisma.purchase.count();
      res.status(200).json({ purchases, total });
    } catch (error) {
      res.status(500).json({ error: 'Falha na busca das compras.' });
    }
  } else if (method === 'DELETE') {
    try {
      const id = req.headers['purchase-id'];
      if (!id || Array.isArray(id)) {
        throw new Error('ID inválido para deleção');
      }

      await prisma.purchase.delete({
        where: {
          id: id,
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Falha na deleção da compra.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
