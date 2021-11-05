import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '../store/initStore';

const GlobalStoreProvider = (props) => {
  const { children } = props;
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        {children}
      </Provider>
    </PersistGate>
  );
};

export default GlobalStoreProvider;
