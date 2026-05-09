import { useState } from 'react'; // 1. Importando o Hook
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Footer } from './components/Footer';
import { Heading } from './components/Heading'; // Certifique-se que este import funciona

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  // 2. Criando o estado
  const [numero, setNumero] = useState(0);

  // 3. Função para aumentar o número (usando prevState)
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
        {/* Adicionando o Heading para o teste da aula */}
        <Heading>Contador: {numero}</Heading>
        <CountDown />
      </Container>

      <Container>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="formRow">
            <DefaultInput
              id="meuInput"
              type="text"
              // 4. O Input agora mostra o valor do estado em tempo real
              labelText={`Task (Número: ${numero})`}
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
            {/* O botão verde agora dispara o aumento do estado */}
            <div onClick={handleClick}>
              <DefaultButton icon={<PlayCircleIcon />} />
            </div>
            
            {/* Seu botão vermelho continua aqui, intocado! */}
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