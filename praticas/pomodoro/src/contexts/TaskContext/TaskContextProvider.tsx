import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';
import { getSettings, getTasks, completeTask } from '../../services/api';
import { useAuthContext } from '../AuthContext/useAuthContext';

// @ts-ignore
import TimerWorker from '../../workers/timerWorker?worker';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const workerRef = useRef<Worker | null>(null);
  const { isAuthenticated } = useAuthContext();

  // Só carrega da API se estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) return;

    getSettings()
      .then((data) => {
        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: {
            workTime: data.workTime,
            shortBreakTime: data.shortBreakTime,
            longBreakTime: data.longBreakTime,
          },
        });
      })
      .catch((err) => console.error('Erro ao carregar settings:', err));

    function fetchTasks() {
      getTasks()
        .then((tasks) => {
          const parsed = tasks.map((t: any) => ({
            ...t,
            startDate: Number(t.startDate),
            completeDate: t.completeDate ? Number(t.completeDate) : null,
            interruptDate: t.interruptDate ? Number(t.interruptDate) : null,
          }));

          const activeFromApi = parsed.find(
            (t: any) => !t.completeDate && !t.interruptDate
          );

          dispatch({ type: TaskActionTypes.LOAD_TASKS, payload: parsed });

          if (activeFromApi) {
            dispatch({ type: TaskActionTypes.START_TASK, payload: activeFromApi });
          }
        })
        .catch((err) => console.error('Erro ao carregar tasks:', err));
    }

    fetchTasks();
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]); // ← recarrega quando o estado de autenticação muda

  useEffect(() => {
    if (state.activeTask) {
      if (!workerRef.current) {
        workerRef.current = new TimerWorker();

        workerRef.current.onmessage = (e: MessageEvent) => {
          const countDownSeconds = e.data;

          if (countDownSeconds <= 0) {
            try {
              const playBeep = loadBeep();
              playBeep();
            } catch (error) {
              console.error('Erro ao reproduzir o alerta sonoro:', error);
            }

            completeTask(state.activeTask!.id, Date.now())
              .catch((err) => console.error('Erro ao completar task:', err));

            dispatch({ type: TaskActionTypes.COMPLETE_TASK });

            if (workerRef.current) {
              workerRef.current.terminate();
              workerRef.current = null;
            }
          } else {
            dispatch({
              type: TaskActionTypes.COUNT_DOWN,
              payload: { secondsRemaining: countDownSeconds },
            });
          }
        };
      }

      workerRef.current.postMessage(state);
    } else {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}