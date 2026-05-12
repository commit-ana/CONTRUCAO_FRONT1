import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;             // Ex: "12345"
  name: string;           // Ex: "Estudar React"
  duration: number;       // Ex: 25
  startDate: number;      // Timestamp (Date.now())
  completeDate: number | null; 
  interruptDate: number | null; 
  // O tipo da task deve ser uma das chaves da configuração (workTime, shortBreak, etc)
  type: keyof TaskStateModel['config'];
};