import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import RootRouter from './Root/Root';
import GlobalThemeProvider from './HOC/GlobalThemeProvider';
import GlobalModalProvider from './HOC/GlobalModalProvider';
import GlobalStoreProvider from './HOC/GlobalStoreProvider';

const App = () => (
  <>
    <BrowserRouter>
      <GlobalStoreProvider>
        <GlobalThemeProvider>
          <GlobalModalProvider>
            <MainLayout>
              <RootRouter />
            </MainLayout>
          </GlobalModalProvider>
        </GlobalThemeProvider>
      </GlobalStoreProvider>

    </BrowserRouter>
  </>
);

export default App;
