import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import RootRouter from './Root/Root';
import GlobalThemeProvider from './HOC/GlobalThemeProvider';
import GlobalModalProvider from './HOC/GlobalModalProvider';

const App = () => (
  <>
    <BrowserRouter>
      <GlobalThemeProvider>
        <GlobalModalProvider>
          <MainLayout>
            <RootRouter />
          </MainLayout>
        </GlobalModalProvider>
      </GlobalThemeProvider>
    </BrowserRouter>
  </>
);

export default App;
