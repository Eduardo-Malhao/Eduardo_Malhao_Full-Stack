import { useContext } from 'react';
import AuthContext from '../Context/Auth.Context';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a SidebarProvider');
  }
  return context;
}

export default useAuth;
