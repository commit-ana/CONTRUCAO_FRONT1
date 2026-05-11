import { useState } from 'react'; // 1. Importação necessária
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Footer } from './components/Footer';
import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  const [numero, setNumero] = useState(0);


  function handleClick() {
    setNumero((prevState) => prevState + 1);
  }

  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <Heading>Ciclos completados: {numero}</Heading>
        <CountDown />
      </Container>

      <Container>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="formRow">
            <DefaultInput
              id="meuInput"
              type="text"
              
              labelText={`Tarefa (Ciclo atual: ${numero})`}
              placeholder="Digite algo"
            />
          </div>

          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className="formRow">
            <Cycles />
          </div>

          <div className="formRow">
            
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
              <DefaultButton icon={<PlayCircleIcon />} />
            </div>
            
            
            <DefaultButton icon={<StopCircleIcon />} color="red" />
          </div>
        </form>
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}