import React, { createContext, useContext, useState } from 'react';
import Toast from '@components/Toast/Toast';

interface ToastContextType {
  showToast: (message: string, duration: number) => void;
}

const defaultValue: ToastContextType = {
  showToast: () => {},
};

const ToastContext = createContext(defaultValue);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}) => {
  const [toast, setToast] = useState<{
    message: string;
    duration: number;
  } | null>(null);

  const showToast = (message: string, duration = 2000) => {
    setToast({ message, duration });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} />}
    </ToastContext.Provider>
  );
};
