import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from '../../contexts/TaskContext/taskReducer';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerManager.getInstance();

  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;
      console.log("⏱️ Worker enviou o tempo:", countDownSeconds);
  

      if (countDownSeconds <= 0) {
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask');
      worker.terminate();
      return;
    }

    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}