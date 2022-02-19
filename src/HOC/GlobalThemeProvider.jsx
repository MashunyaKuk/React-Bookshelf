import React, { useState, memo } from 'react';
import { ThemeProvider, StyleSheetManager, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from '../assets/styles/themes';
import { userThemeSelector } from '../store/selectors/userThemeSelector';
import { useSelector } from 'react-redux';

export const ThemeContext = React.createContext('');

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Montserrat';
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
      color: ${({ theme }) => theme.text};
    }

/* 
    @keyframes spinner {
  to {transform: rotate(360deg);}
}
    .loading-indicator:before {
      content: '';
      background: #000000cc;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
}

    .loading-indicator:after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      margin-top: -10px;
      margin-left: -10px;
      border-radius: 50%;
      border: 5px solid #F6F5F3;
      border-top-color: #000000cc;
      animation: spinner .6s linear infinite;      
    } */
`;

const GlobalThemeProvider = (props) => {
  const userTheme = useSelector(userThemeSelector);
  const [theme, setTheme] = useState(userTheme.theme);
  const { children } = props;

  return (
    <StyleSheetManager>
      <ThemeProvider theme={theme !== 'dark' ? lightTheme : darkTheme}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <GlobalStyle />
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default memo(GlobalThemeProvider);
