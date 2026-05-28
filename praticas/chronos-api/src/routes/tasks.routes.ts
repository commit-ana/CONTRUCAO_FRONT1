import { Router } from 'express';
import { prisma } from '../lib/prisma';
export const tasksRouter = Router();

// GET /tasks - Listar por ordenação startDate desc
tasksRouter.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { startDate: 'desc' },
  });
  
  const formattedTasks = tasks.map(task => ({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate ? task.completeDate.toString() : null,
    interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
  }));

  return res.json(formattedTasks);
});

// POST /tasks - Criar tarefa
tasksRouter.post('/', async (req, res) => {
  const { id, name, duration, type, startDate } = req.body as {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  };

  const task = await prisma.task.create({
    data: { id, name, duration, type, startDate: BigInt(startDate) },
  });

  return res.status(201).json({
    ...task,
    startDate: task.startDate.toString()
  });
});

// PATCH /tasks/:id/complete - Concluir
tasksRouter.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completeDate } = req.body as { completeDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { completeDate: BigInt(completeDate) },
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate ? task.completeDate.toString() : null
  });
});

// PATCH /tasks/:id/interrupt - Interromper
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body as { interruptDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { interruptDate: BigInt(interruptDate) },
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    interruptDate: task.interruptDate ? task.interruptDate.toString() : null
  });
});

// DELETE /tasks - Limpar histórico
tasksRouter.delete('/', async (_req, res) => {
  await prisma.task.deleteMany();
  return res.status(204).send();
});