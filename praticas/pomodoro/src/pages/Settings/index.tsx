import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'; // ✨ Novo Import!
import { useRef } from 'react';

export function Settings() {
  const { state } = useTaskContext();

  // ✨ PASSO 1 (Prática 79): Criação das referências para inputs não controlados
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  // ✨ PASSO 2 (Prática 79): Manipulador do envio que captura os dados sob demanda
  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Impede o reload indesejado da página

    const workTime = workTimeInput.current?.value;
    const shortBreakTime = shortBreakTimeInput.current?.value;
    const longBreakTime = longBreakTimeInput.current?.value;

    // Log temporário para checarmos a captura antes das validações das próximas aulas
    console.log('Valores capturados:', { workTime, shortBreakTime, longBreakTime });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center', fontSize: '1.6rem', color: 'var(--text-default)' }}>
          Modifique as configurações para tempo de foco, descanso curto e descanso longo.
        </p>
      </Container>

      <Container>
        {/* ✨ PASSO 3 (Prática 79): Vinculação do evento onSubmit */}
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime} // Reidrata com o valor do estado global
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}