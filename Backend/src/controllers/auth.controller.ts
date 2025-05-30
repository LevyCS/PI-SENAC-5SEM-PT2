import { Request, Response } from "express";
import { z } from "zod";
import { generateToken } from "../utils/jwt.util";
import { PrismaClient } from '@prisma/client'
import { comparePassword, hashPassword } from "../utils/crypto.util";

const prisma = new PrismaClient()

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = registerSchema.parse(req.body);


    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await comparePassword(password, user.password))) {
            res.status(400).json({ error: "Invalid credentials" });
            return
        }

        const token = generateToken(user.id);
        res.json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
