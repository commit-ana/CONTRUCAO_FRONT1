import { Router } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const authRouter = Router();

// POST /auth/register
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

// POST /auth/login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );

  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// POST /auth/forgot-password
authRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body as { email: string };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Retorna sucesso mesmo se não encontrar, por segurança
    return res.json({ message: 'Se o e-mail existir, você receberá as instruções.' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

  await prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExpiry },
  });

  // Em ambiente de laboratório, imprime o token no terminal
  console.log(`\n🔑 Token de recuperação para ${email}: ${resetToken}\n`);

  return res.json({ message: 'Se o e-mail existir, você receberá as instruções.' });
});

// POST /auth/reset-password
authRouter.post('/reset-password', async (req, res) => {
  const { token, password } = req.body as { token: string; password: string };

  if (!token || !password) {
    return res.status(400).json({ message: 'Token e nova senha são obrigatórios.' });
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Token inválido ou expirado.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return res.json({ message: 'Senha redefinida com sucesso.' });
});