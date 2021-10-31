import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import RootRouter from './Root/Root';
import GlobalThemeProvider from './HOC/GlobalThemeProvider';

const App = () => (
  <>
    <BrowserRouter>
      <GlobalThemeProvider>
        <MainLayout>
          <RootRouter />
        </MainLayout>
      </GlobalThemeProvider>
    </BrowserRouter>
  </>
);

export default App;
