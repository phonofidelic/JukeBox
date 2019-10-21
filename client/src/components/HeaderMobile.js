import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme.context';
import LibraryControls from './LibraryMobile/LibraryControls';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.border};
  display: flex;
  width: 100%;
  // height: ${({ theme }) => theme.dimensions.libraryControls.height};
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderMobile = props => {
  const theme = useContext(ThemeContext);

  const renderHeaderContent = () => {
    switch (props.pathname) {
      case '/home':
        return 'Home';

      case '/library':
        return 'Library';

      default:
        return null;
    }
  };

  return (
    <Container theme={theme}>
      <div>jukebox</div>
      <div>{renderHeaderContent()}</div>
    </Container>
  );
};

export default HeaderMobile;
