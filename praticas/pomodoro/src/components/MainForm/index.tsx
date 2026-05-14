import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { Tips } from '../Tips';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager'; // Importação do Manager
import type { TaskModel } from '../../models/TaskModel';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyleType = getNextCycleType(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: new Date(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCyleType],
      type: nextCyleType,
    };

    // 1. Atualiza o Reducer
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    // 2. USO DO SINGLETON (Prática 57)
    // Em vez de 'new Worker', pedimos a instância única para o Manager
    const timerWorkerManager = TimerWorkerManager.getInstance();

    // Testes de comunicação
    timerWorkerManager.postMessage('FAVOR');
    timerWorkerManager.postMessage('FALA_OI');
    timerWorkerManager.postMessage('BLALBLA');
    timerWorkerManager.postMessage('FECHAR');

    timerWorkerManager.onmessage(event => {
      console.log('PRINCIPAL recebeu via Manager:', event.data);
    });

    taskNameInput.current.value = '';
  }

  function handleInterruptTask() {
    if (!state.activeTask) {
      return;
    }
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK, payload: state.activeTask });
    
    // Opcional: interromper o worker imediatamente ao clicar em Stop
    TimerWorkerManager.getInstance().terminate();
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          placeholder='Qual tarefa vamos focar agora?'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            key="botao_stop_form"
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}