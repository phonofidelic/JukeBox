import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme.context';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.border};
`;

const Header = () => {
  const theme = useContext(ThemeContext);

  return <Container theme={theme}>Header</Container>;
};

export default Header;
