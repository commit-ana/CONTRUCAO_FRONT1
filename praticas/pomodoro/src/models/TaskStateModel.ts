import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  // Histórico de todas as tarefas
  tasks: TaskModel[];

  // Dados do cronômetro em tempo real
  secondsRemaining: number; // Quantos segundos faltam no cronômetro atual
  formattedSecondsRemaining: string; // Ex: "25:00"
  activeTask: TaskModel | null;      // Se for null, o timer está parado

  // Ciclo atual (as bolinhas verdes/cinzas do seu componente Cycles)
  currentCycle: number;   // Vai de 1 a 8 (controla as bolinhas coloridas)

  // Tempos configurados (em minutos)
  config: {
    workTime: number; // Tempo de foco (ex: 25)
    shortBreakTime: number; // Descanso curto (ex: 5)
    longBreakTime: number; // Descanso longo (ex: 15)
  };
};

