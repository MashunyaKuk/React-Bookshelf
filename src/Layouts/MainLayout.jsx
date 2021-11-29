import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const StyledMainLayout = styled.div`

`;

const MainLayout = (props) => {
  const { children } = props;
  return (
    <StyledMainLayout className="app">
      <Header />
      {children}
      <Footer />
    </StyledMainLayout>
  );
};

export default MainLayout;