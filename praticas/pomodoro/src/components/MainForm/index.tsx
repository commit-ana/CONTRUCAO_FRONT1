import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
  // Puxamos a função 'setState' do contexto
  const { setState } = useTaskContext();

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('DEU CERTO');
  }

  // Função de teste para atualizar o estado global
  function handleClick() {
    setState(prevState => {
      return {
        ...prevState,
        formattedSecondsRemaining: '21:00', // Força o relógio a mostrar 21:00
      };
    });
  }

  return (
    <form>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de 25min</p>
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