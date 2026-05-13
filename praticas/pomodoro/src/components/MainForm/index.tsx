import { PlayCircleIcon, StopCircle, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react'; // 1. Importando o useRef
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
  const { state } = useTaskContext();

  // 2. Criando a "caixa forte" para o input
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 4. Lendo o valor apenas agora, no submit!
    const taskTitle = taskNameInput.current?.value;
    console.log('Tarefa capturada:', taskTitle);
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Qual a sua tarefa?'
          // 3. Passando a referência para o nosso componente
          ref={taskNameInput}
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de {state.config.workTime}min</p>
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