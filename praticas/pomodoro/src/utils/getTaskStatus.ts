import type { TaskModel } from '../models/TaskModel';

/**
 * Avalia as propriedades de uma tarefa em relação à tarefa ativa e retorna o status legível.
 * @param task A tarefa da linha atual da tabela
 * @param activeTask A tarefa ativa atualmente no estado global (pode ser null)
 */
export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null): string {
  if (task.completeDate) return 'Completa';
  if (task.interruptDate) return 'Interrompida';
  if (task.id === activeTask?.id) return 'Em Progresso';
  
  return 'Abandonada';
}