import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import { showMessage } from '../../adapters/showMessage';
import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'recover';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('login');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      showMessage.warn('Informe o usuário');
      return;
    }
    if (!password) {
      showMessage.warn('Informe a senha');
      return;
    }

    if (login(username, password)) {
      showMessage.success('Bem-vindo ao Chronos Pomodoro!');
      navigate('/home');
    } else {
      showMessage.error('Usuário ou senha inválidos');
    }
  }

  if (viewMode === 'register') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Criar Conta 🍅</h2>
          <p>O fluxo completo de cadastro será implementado nas etapas do backend.</p>
          <button type="button" className={styles.linkBtn} onClick={() => setViewMode('login')}>
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'recover') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Recuperar Senha 🚀</h2>
          <p>O fluxo de envio de e-mail de recuperação será acoplado em breve.</p>
          <button type="button" className={styles.linkBtn} onClick={() => setViewMode('login')}>
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Chronos Pomodoro</h2>
        
        <div className={styles.inputGroup}>
          <label htmlFor="login-user">Usuário</label>
          <input
            id="login-user"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário (demo)"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="login-pass">Senha</label>
          <input
            id="login-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha (demo123)"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Entrar</button>

        <div className={styles.actions}>
          <button type="button" className={styles.linkBtn} onClick={() => {
            showMessage.info('Fluxo de Cadastro (Simulação)');
            setViewMode('register');
          }}>
            Não tem conta? Cadastre-se
          </button>
          
          <button type="button" className={styles.linkBtn} onClick={() => {
            showMessage.info('Fluxo de Recuperação (Simulação)');
            setViewMode('recover');
          }}>
            Esqueci minha senha
          </button>
        </div>
      </form>
    </div>
  );
}