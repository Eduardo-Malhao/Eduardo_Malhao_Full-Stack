import React, { useEffect, useState, useMemo, type ReactNode } from "react";
import ToastContext from "../Context/Toast.Context";

import type { ToastContextType } from "../Context/Toast.Context";
import type { IToast } from "../Features/Toast/Types";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<IToast>({} as IToast);

    useEffect(() => {
      if (toast) {
        const timer = setTimeout(() => setToast({} as IToast), 3500);
        return () => clearTimeout(timer);
      }
    }, [toast]);

  const value = useMemo<ToastContextType>(
    () => ({
      toast,
      setToast
    }),
    [toast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;