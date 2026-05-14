import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
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

  // Calcula o próximo ciclo e o tipo de intervalo correspondente
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  // Função disparada ao enviar o formulário (Iniciar Tarefa)
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    
    // Validação para não aceitar campo vazio
    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    // Monta o objeto da nova tarefa
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: new Date(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    // Despacha a ação de iniciar tarefa para o Reducer com a carga (payload)
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    // Limpa o campo de texto do input usando a referência
    taskNameInput.current.value = '';
  }

  // Função disparada ao clicar no botão de interromper
  function handleInterruptTask() {
    if (state.activeTask) {
      dispatch({ type: TaskActionTypes.INTERRUPT_TASK, payload: state.activeTask });
    }
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          placeholder='Qual tarefa vamos focar agora?'
          ref={taskNameInput}
          // Bloqueia o input dinamicamente se houver uma tarefa rodando
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo: {state.config[nextCycleType]}min</p>
      </div>

      {/* Renderiza os círculos indicadores se já tiver iniciado algum ciclo */}
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {/* Renderiza apenas se NÃO houver tarefa ativa */}
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        )}

        {/* Renderiza apenas se HOUVER tarefa ativa */}
        {!!state.activeTask && (
          <DefaultButton
            key="botao_stop_form" // Evita o bug de reaproveitamento do React
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button' // Impede que o botão envie o formulário acidentalmente
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}