import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>('dark');

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    // 1. Lógica de inversão de tema usando callback (Jeito Seguro)
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      // ❌ NÃO FAÇA ISSO: document.documentElement.setAttribute('data-theme', nextTheme);
      // Alterar o DOM aqui dentro é uma má prática pois esta função deve ser pura.
      
      return nextTheme;
    });

    // ❌ SE FIZER ISSO AQUI: document.documentElement.setAttribute('data-theme', theme);
    // O valor de 'theme' ainda será o ANTIGO, por isso o tema fica atrasado um clique.
  }

  return (
    <nav className={styles.menu}>
      {/* Visualização para teste */}
      <span style={{ color: 'var(--gray-800)', fontSize: '12px' }}>
        Estado: {theme}
      </span>

      <a className={styles.menuLink} href='#' aria-label='Ir para a Home' title='Ir para a Home'>
        <HouseIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Ver Histórico' title='Ver Histórico'>
        <HistoryIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>

      <a
        className={styles.menuLink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange}
      >
        <SunIcon />
      </a>
    </nav>
  );
}