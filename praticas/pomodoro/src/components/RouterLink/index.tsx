import { Link } from 'react-router';

type RouterLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  // Ele recebe 'href' (padrão do HTML) e converte para 'to' (padrão do React Router)
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}