import { useContext } from 'react';
import ToastContext from '../Context/Toast.Context';

const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export default useToast;
