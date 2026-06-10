import { Navigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}