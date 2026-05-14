import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { Tips } from '../Tips'; // Importação do novo componente
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
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

    // Cálculos necessários para montar a nova tarefa com base no estado atual
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyleType = getNextCycleType(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: new Date(),
      completeDate: null,
      interruptDate: null,
      // Agora a duração vem dinamicamente das configurações
      duration: state.config[nextCyleType],
      type: nextCyleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    taskNameInput.current.value = '';
  }

  function handleInterruptTask() {
    if (!state.activeTask) return;

    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
      payload: state.activeTask,
    });
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

      {/* Renderização das Dicas Contextuais */}
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