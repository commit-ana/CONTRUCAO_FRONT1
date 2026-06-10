import { KeyRoundIcon, TimerIcon } from 'lucide-react';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { useRef, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { resetPassword } from '../../services/api';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './styles.module.css';

export function ResetPassword() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const password = passwordInput.current?.value.trim();
    const confirmPassword = confirmPasswordInput.current?.value.trim();

    if (!password || !confirmPassword) {
      showMessage.error('Preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      showMessage.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      showMessage.error('As senhas não coincidem.');
      return;
    }

    if (!token) {
      showMessage.error('Token inválido. Solicite uma nova recuperação.');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, password);
      showMessage.success('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (err: any) {
      showMessage.error(err.message || 'Token inválido ou expirado.');
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

        <h1 className={styles.title}>Redefinir senha</h1>
        <p className={styles.subtitle}>Digite sua nova senha abaixo.</p>

        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput
              id='password'
              labelText='Nova senha'
              type='password'
              placeholder='••••••••'
              ref={passwordInput}
            />
          </div>

          <div className={styles.formRow}>
            <DefaultInput
              id='confirmPassword'
              labelText='Confirmar senha'
              type='password'
              placeholder='••••••••'
              ref={confirmPasswordInput}
            />
          </div>

          <DefaultButton
            icon={<KeyRoundIcon />}
            aria-label='Redefinir senha'
            title={isLoading ? 'Salvando...' : 'Redefinir senha'}
            disabled={isLoading}
            type='submit'
          />
        </form>
      </div>
    </div>
  );
}