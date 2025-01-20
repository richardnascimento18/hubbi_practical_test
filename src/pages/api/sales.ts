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
      const { price, products, date } = req.body;
      const newSale = await prisma.sale.create({
        data: {
          price,
          date: new Date(date),
          products: {
            create: products.map(({ id, quantity }) => ({
              product: { connect: { id } },
              quantity,
            })),
          },
        },
      });
      res.status(201).json(newSale);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao cria Venda.' });
    }
  } else if (method === 'GET') {
    try {
      const { page = 1, limit = 2 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const sales = await prisma.sale.findMany({
        skip: skip,
        take: Number(limit),
        include: {
          products: { include: { product: true } },
          purchase: true,
        },
      });
      const total = await prisma.sale.count();
      res.status(200).json({ sales, total });
    } catch (error) {
      res.status(500).json({ error: 'Falha ao buscar Vendas.' });
    }
  } else if (method === 'DELETE') {
    try {
      const id = req.headers['sale-id'];
      if (!id || Array.isArray(id)) {
        throw new Error('ID inválido para deleção');
      }

      await prisma.sale.delete({
        where: {
          id: id,
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Falha na deleção da venda.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
