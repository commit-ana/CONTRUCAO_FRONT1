import type { TaskModel } from '../../models/TaskModel';

// 1. Dicionário de ações seguro contra erros de digitação (Substituto moderno do Enum)
export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

// 2. Ações que OBRIGATORIAMENTE precisam levar a Task como encomenda (payload)
export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
      payload: TaskModel;
    };

// 3. Ações limpas que não aceitam dados extras
export type TaskActionsWithoutPayload = {
  type: typeof TaskActionTypes.RESET_STATE;
};

// 4. O Tipo Final que o nosso futuro Reducer vai exigir
export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;