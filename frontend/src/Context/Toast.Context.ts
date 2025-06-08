import { createContext } from 'react';
import type { IToast } from '../Features/Toast/Types';

export interface ToastContextType {
  toast: IToast,
  setToast: React.Dispatch<React.SetStateAction<IToast>>; 
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default ToastContext;
