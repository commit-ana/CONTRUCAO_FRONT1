// src/models/TaskModel.ts
export type TaskModel = {
  id: string;
  name: string;
  startDate: Date;
  completeDate: Date | null;
  interruptDate: Date | null;
  duration: number;
  type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
};