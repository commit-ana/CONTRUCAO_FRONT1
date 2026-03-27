import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput'

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

       <Container>
        <CountDown />
      </Container>

      <Container>
  <form className="form" action="">
    {/* Grupo 1 */}
    <div className="formRow">
      <label htmlFor="meuInput">task</label>
      <input id="meuInput" type="text" />
    </div>

    {/* Grupo 2 */}
    <div className="formRow">
      <p>Lorem ipsum dolor sit amet.</p>
    </div>

    {/* Grupo 3 */}
    <div className="formRow">
      <p>Ciclos</p>
      <p>0 0 0 0 0 0 0</p>
    </div>

    {/* Grupo 4 */}
    <div className="formRow">
      <button>Enviar</button>
    </div>
  </form>
</Container>
    </>
  );
}
<DefaultInput
  id="meuInput"
  type="text"
  labelText="task"
  placeholder="Digite algo"
  required
/>
