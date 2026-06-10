import styles from './styles.module.css';

type GenericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
  // Esse componente apenas "envelopa" o conteúdo para o CSS agir
  return <div className={styles.genericHtml}>{children}</div>;
}