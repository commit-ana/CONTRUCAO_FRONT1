import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';

export function Home() {
  const { user } = useAuthContext();

  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      {user && (
        <Container>
          <p style={{
            textAlign: 'center',
            fontSize: '1.6rem',
            color: 'var(--text-muted)',
          }}>
            Olá, <strong style={{ color: 'var(--primary)' }}>{user.name}</strong>! Bora focar? 🍅
          </p>
        </Container>
      )}

      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}