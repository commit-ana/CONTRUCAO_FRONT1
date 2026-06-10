import { MailIcon, TimerIcon } from 'lucide-react';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { useRef, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { forgotPassword } from '../../services/api';
import styles from './styles.module.css';

export function ForgotPassword() {
  const emailInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const email = emailInput.current?.value.trim();

    if (!email) {
      showMessage.error('Digite seu e-mail.');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      showMessage.error('Erro ao enviar. Tente novamente.');
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

        <h1 className={styles.title}>Recuperar senha</h1>

        {sent ? (
          <>
            <p className={styles.successText}>
              Instruções enviadas! Verifique o terminal da API para obter o token de recuperação.
            </p>
            <a href='/login' className={styles.backLink}>
              Voltar para o login
            </a>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Digite seu e-mail para receber as instruções de recuperação.
            </p>

            <form onSubmit={handleForgotPassword} className={styles.form}>
              <div className={styles.formRow}>
                <DefaultInput
                  id='email'
                  labelText='E-mail'
                  type='email'
                  placeholder='seu@email.com'
                  ref={emailInput}
                />
              </div>

              <DefaultButton
                icon={<MailIcon />}
                aria-label='Enviar instruções'
                title={isLoading ? 'Enviando...' : 'Enviar instruções'}
                disabled={isLoading}
                type='submit'
              />
            </form>

            <a href='/login' className={styles.backLink}>
              Voltar para o login
            </a>
          </>
        )}
      </div>
    </div>
  );
}