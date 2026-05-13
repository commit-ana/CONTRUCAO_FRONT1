import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle'; // Importando a lógica
import type { TaskModel } from '../../models/TaskModel';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  // A MÁGICA: Sempre calculamos o valor do próximo ciclo com base no que está no estado
  const nextCycle = getNextCycle(state.currentCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: new Date(),
      completeDate: null,
      interruptDate: null,
      duration: 1, // Por enquanto fixo
      type: 'workTime',
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: nextCycle, // Usando o ciclo que calculamos lá em cima!
      secondsRemaining,
      tasks: [...prevState.tasks, newTask],
    }));

    taskNameInput.current.value = '';
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput labelText='task' id='meuInput' type='text' placeholder='Tarefa' ref={taskNameInput} />
      </div>

      <div className='formRow'>
        {/* Agora você pode usar o nextCycle aqui para mostrar algo dinâmico se quiser */}
        <p>Próximo ciclo será o: {nextCycle}</p>
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