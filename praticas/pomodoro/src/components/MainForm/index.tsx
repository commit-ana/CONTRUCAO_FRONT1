import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel'; 

export function MainForm() {
  const { setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 1. Validação de Segurança e Trim
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    // 2. Montando o Objeto da Tarefa
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: new Date(),
      completeDate: null,
      interruptDate: null,
      duration: 1, // Temporário: 1 minuto
      type: 'workTime',
    };
    const secondsRemaining = newTask.duration * 60;

    // 3. Salvando no Estado Global
    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: 1,
        secondsRemaining,
        formattedSecondsRemaining: '01:00', // Ajustado para refletir o 1 min
        tasks: [...prevState.tasks, newTask], // Imutabilidade: novo array com a nova task
      };
    });

    // Limpa o input após criar
    taskNameInput.current.value = '';
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Qual a tarefa de agora?'
          ref={taskNameInput}
        />
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
        <DefaultButton icon={<StopCircleIcon />} color='red' />
      </div>

      
    </form>
  );
}