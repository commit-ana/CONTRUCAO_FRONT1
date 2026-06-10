import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const tasksRouter = Router();

// GET /tasks
tasksRouter.get('/', async (req, res) => {
  const userId = (req as any).userId;

  const tasks = await prisma.task.findMany({
    where: { userId },
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

// POST /tasks
tasksRouter.post('/', async (req, res) => {
  const userId = (req as any).userId;
  const { id, name, duration, type, startDate } = req.body as {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  };

  const task = await prisma.task.create({
    data: { id, name, duration, type, startDate: BigInt(startDate), userId },
  });

  return res.status(201).json({
    ...task,
    startDate: task.startDate.toString(),
  });
});

// PATCH /tasks/:id/complete
tasksRouter.patch('/:id/complete', async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { completeDate } = req.body as { completeDate: number };

  const task = await prisma.task.update({
    where: { id, userId },
    data: { completeDate: BigInt(completeDate) },
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate ? task.completeDate.toString() : null,
  });
});

// PATCH /tasks/:id/interrupt
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { interruptDate } = req.body as { interruptDate: number };

  const task = await prisma.task.update({
    where: { id, userId },
    data: { interruptDate: BigInt(interruptDate) },
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
  });
});

// DELETE /tasks
tasksRouter.delete('/', async (req, res) => {
  const userId = (req as any).userId;
  await prisma.task.deleteMany({ where: { userId } });
  return res.status(204).send();
});