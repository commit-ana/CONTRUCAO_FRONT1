import { Container } from './components/Container';
import { Heading } from './components/Heading';

export function App() {
  return (
    <>
      {/* Seção 1 */}
      <Container>
        <Heading>Logo</Heading>
      </Container>

      {/* Seção 2 */}
      <Container>
        <Heading>Menu</Heading>
      </Container>
    </>
  );
}