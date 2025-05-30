import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export async function createConsultation(req: Request, res: Response) {
    const registerSchema = z.object({
        local: z.string(),
        type: z.enum(["EXAM","CONSULT", "RETURN"]),
        doctor: z.string(),
        date: z.string().datetime(),
        description: z.string(),
    });

    const files = req.files as Express.Multer.File[];

    try {
        const schema = registerSchema.parse(req.body);

        const consultation = await prisma.consultation.create({
          data: {
            userId: req.user.userId,
            ...schema,
            files: {
              create: files.map((file) => ({
                filename: file.filename,
              })),
            },
          }, 
          include: { files: true },
        });
        res.status(201).json(consultation);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getOneConsultation(req: Request, res: Response) {
  try {
    const consultations = await prisma.consultation.findFirst({
      where: { 
        userId: req.user.userId,
        id: req.params.id
      },
      include: {
        files: true
      }
    });
    res.json(consultations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllConsultation(req: Request, res: Response) {
  try {
    const consultations = await prisma.consultation.findMany({
      where: { userId: req.user.userId },
    });
    res.json(consultations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateConsultation(req: Request, res: Response) {
  const { id } = req.params;
  const { date, description } = req.body;

  try {
    const consultation = await prisma.consultation.update({
      where: { id },
      data: { date: new Date(date), description },
    });

    res.json(consultation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteConsultation(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.consultation.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
