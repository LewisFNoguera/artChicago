import React, { useCallback, useEffect } from 'react';
import BootSplash from "react-native-bootsplash";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ToastProvider } from '@context/ToastContext';
import { store, persistor } from '@redux/store';
import AppRouter from './src/router/appRouter';

export default function App() {
  const init = useCallback(async () => {
    try {
      await BootSplash.hide();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
