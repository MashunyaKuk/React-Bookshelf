import React, { useState, memo } from 'react';
import { ThemeProvider, StyleSheetManager, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from '../assets/styles/themes';

export const ThemeContext = React.createContext('');


const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }

    p, h1, h2, h3, h4, h5, h6 {
      margin-block-start: 0;
      margin-block-end: 0;
    }

    ul {
      padding-inline-start: 0;
    }
    
    li {
      list-style: none;
    }

    a {
      text-decoration: none;
    }
`;

const GlobalThemeProvider = (props) => {
  const [theme, setTheme] = useState('light');
  const { children } = props;
  return (
    <StyleSheetManager>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <ThemeContext.Provider value={setTheme}>
          <GlobalStyle />
          {children}
          <button onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
            Switch Theme
          </button>
        </ThemeContext.Provider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default memo(GlobalThemeProvider);
