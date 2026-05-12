import type { TaskStateModel } from './TaskStateModel'; // Importa o IRMÃO

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel['config']; // Usa a chave do outro arquivo
};