import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './TaskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {

  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload; // O TS sabe que existe payload aqui!
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          // Marca a data de interrupção na tarefa ativa
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: new Date(Date.now()) };
          }
          return task;
        }),
      };
    }
    
    case TaskActionTypes.RESET_STATE: {
      return state;
    }

    // 🔥 NOVA ACTION: Atualiza o tempo diminuindo a cada segundo
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }

    // 🔥 NOVA ACTION: Completa a tarefa quando o relógio zera
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks : state.tasks.map(task => {
          // Marca a data de conclusão na tarefa ativa
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    
    default:
      return state;
  }
}