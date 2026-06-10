import { LogInIcon, TimerIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { useRef, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { loginUser } from '../../services/api';
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';

export function Login() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const email = emailInput.current?.value.trim();
    const password = passwordInput.current?.value.trim();

    if (!email || !password) {
      showMessage.error('Preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data.token, data.user);
      navigate('/');
    } catch (err: any) {
      showMessage.error(err.message || 'E-mail ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <TimerIcon className={styles.logoIcon} />
          <span className={styles.logoText}>Chronos</span>
        </div>

        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre na sua conta para continuar</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput
              id='email'
              labelText='E-mail'
              type='email'
              placeholder='seu@email.com'
              ref={emailInput}
            />
          </div>

          <div className={styles.formRow}>
            <DefaultInput
              id='password'
              labelText='Senha'
              type='password'
              placeholder='••••••••'
              ref={passwordInput}
            />
          </div>

          <a href='/forgot-password' className={styles.forgotLink}>
            Esqueci minha senha
          </a>

          <DefaultButton
            icon={<LogInIcon />}
            aria-label='Entrar'
            title={isLoading ? 'Entrando...' : 'Entrar'}
            disabled={isLoading}
            type='submit'
          />
        </form>

        <p className={styles.registerText}>
          Não tem uma conta?{' '}
          <a href='/register' className={styles.registerLink}>
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}