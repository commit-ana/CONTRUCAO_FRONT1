import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType'; // Novo import!
import type { TaskModel } from '../../models/TaskModel';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  // ENGATILHANDO A PRÓXIMA JOGADA:
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle); // Descobre se é foco ou pausa

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
  // 🔴 ANTES: duration: 1,
  // 🟢 AGORA: Pegamos a duração certa baseada no tipo do ciclo!
  duration: state.config[nextCycleType],
  type: nextCycleType,
};

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining,
      tasks: [...prevState.tasks, newTask],
    }));

    taskNameInput.current.value = '';
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput labelText='task' id='meuInput' type='text' placeholder='O que vamos fazer?' ref={taskNameInput} />
      </div>

      <div className='formRow'>
        {/* DICA: Agora você pode mostrar visualmente o que vem a seguir! */}
        <p>Ciclo {nextCycle}: {nextCycleType === 'workTime' ? 'Foco' : 'Pausa'}</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
        <DefaultButton icon={<StopCircleIcon />} color='red'/>
      </div>

    </form>
  );
}