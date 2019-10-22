import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme.context';
import LibraryControls from './LibraryMobile/LibraryControls';
import SearchContainer from '../containers/SearchContainer';

import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.border};
  display: flex;
  align-items: center;
  text-align: left;
  // justify-content: flex-end;
  // width: 100vw;
  height: ${({ theme }) => theme.dimensions.header.height}px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Brand = styled.div`
  margin-left: 1em;
  // flex: 5;
`;

const HeaderMobile = props => {
  const theme = useContext(ThemeContext);

  const renderHeaderContent = () => {
    switch (props.pathname) {
      // case '/home':
      //   return 'Home';

      case '/library':
        return <SearchContainer />;

      default:
        return null;
    }
  };

  return (
    <Container theme={theme}>
      {/* <Brand theme={theme}>
        <Typography>jukebox</Typography>
      </Brand> */}
      {renderHeaderContent()}
    </Container>
  );
};

export default HeaderMobile;
