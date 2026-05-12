import type { HomeProps } from '../../pages/Home';
import styles from './styles.module.css';

// Usamos a tipagem exportada da Home
export function CountDown({ state }: HomeProps) {
  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}