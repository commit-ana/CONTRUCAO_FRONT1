import type { TaskModel } from '../models/TaskModel';

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  // 1. Ciclo 8 (e múltiplos de 8) = Pausa Longa
  if (currentCycle % 8 === 0) return 'longBreakTime';

  // 2. Ciclos Pares (2, 4, 6) = Pausa Curta
  if (currentCycle % 2 === 0) return 'shortBreakTime';

  // 3. Sobrou apenas os Ímpares (1, 3, 5, 7) = Foco
  return 'workTime';
}