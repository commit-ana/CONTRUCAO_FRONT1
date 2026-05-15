import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  
  // 📦 Nossa caixinha que guarda a função de tocar o alarme
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  // ⏱️ Efeito 1: O que fazer quando o Worker manda o tempo
  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        // 🔊 O TEMPO ACABOU! Toca o alarme se a caixinha estiver cheia!
        if (playBeepRef.current) {
          playBeepRef.current(); // Toca!
          playBeepRef.current = null; // Esvazia a caixinha
        }
        
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  // 🚀 Efeito 2: O que fazer quando uma tarefa começa ou é interrompida
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }
    worker.postMessage(state);
  }, [worker, state]);

  // 🎧 Efeito 3: O Truque para enganar o Safari e destravar o áudio
  useEffect(() => {
    // Se a tarefa foi interrompida, esvazia a caixinha de áudio
    if (!state.activeTask) {
      playBeepRef.current = null;
      return;
    }

    // Se a tarefa começou e a caixinha está vazia...
    if (playBeepRef.current === null) {
      const play = loadBeep(); // Carrega o áudio
      playBeepRef.current = play; // Guarda na caixinha
      
      // Dá um play() imediato! Isso destrava as restrições do navegador.
      play(); 
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}