import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function getUserInfos(req: Request, res: Response) {
    try {
      const userInfo = await prisma.user.findMany({
        where: { id: req.user.userId },
      });
      res.json(userInfo[0]);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}