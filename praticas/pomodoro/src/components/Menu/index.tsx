import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState } from 'react';

// 1. Tipagem Estrita: Garante que só aceitamos esses dois valores
type AvailableThemes = 'dark' | 'light';

export function Menu() {
  // 2. Estado local para controlar o tema
  const [theme, setTheme] = useState<AvailableThemes>('dark');

  // 3. Função com tipagem correta de evento e preventDefault
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault(); // Impede o recarregamento da página (comportamento padrão do <a>)
    
    // Lógica simples para alternar (Veremos a troca real de cores na próxima aula)
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    
    console.log('Tema alterado para:', theme);
  }

  return (
    <nav className={styles.menu}>
      {/* Texto para validar se o estado está mudando */}
      <span style={{ color: 'var(--gray-800)' }}>Tema: {theme}</span>

      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ir para a Home' // Acessibilidade
        title='Ir para a Home'       // UX: Tooltip ao passar o mouse
      >
        <HouseIcon />
      </a>

      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon />
      </a>

      <a
        className={styles.menuLink}
        href='#'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>

      {/* Botão de Alternância */}
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange} // Evento de clique
      >
        <SunIcon />
      </a>
    </nav>
  );
}