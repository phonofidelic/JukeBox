import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme.context';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.border};
  display: flex;
  width: 100%;
  height: 56px;
  position: sticky;
  top: 0;
`;

const HeaderDesktop = props => {
  const theme = useContext(ThemeContext);

  return (
    <Container theme={theme}>
      <div>jukebox</div>
      <div>{props.pathname}</div>
    </Container>
  );
};

export default HeaderDesktop;
