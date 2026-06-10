import { UserPlusIcon, TimerIcon } from 'lucide-react';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { useRef, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';

export function Register() {
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const name = nameInput.current?.value.trim();
    const email = emailInput.current?.value.trim();
    const password = passwordInput.current?.value.trim();

    if (!name || !email || !password) {
      showMessage.error('Preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      showMessage.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({ name, email, password });
      showMessage.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err: any) {
      showMessage.error(err.message || 'Erro ao criar conta. Tente novamente.');
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

        <h1 className={styles.title}>Criar conta</h1>
        <p className={styles.subtitle}>Preencha os dados para se cadastrar</p>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput
              id='name'
              labelText='Nome'
              type='text'
              placeholder='Seu nome'
              ref={nameInput}
            />
          </div>

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

          <DefaultButton
            icon={<UserPlusIcon />}
            aria-label='Criar conta'
            title={isLoading ? 'Criando conta...' : 'Criar conta'}
            disabled={isLoading}
            type='submit'
          />
        </form>

        <p className={styles.loginText}>
          Já tem uma conta?{' '}
          <a href='/login' className={styles.loginLink}>
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}