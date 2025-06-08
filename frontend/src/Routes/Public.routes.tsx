import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem('HMZ-Authentication-Token');

  if (token) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default PublicRoute;