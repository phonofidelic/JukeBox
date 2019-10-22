import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme.context';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex: auto;
  align-items: baseline;
`;

const SearchField = styled(TextField)`
  && {
    flex: 5;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const SearchButton = styled(Button)`
  height: 56px;
  && {
    // flex: 1;
    border-left: 1px solid ${({ theme }) => theme.palette.primary.border};
    border-radius: 0;
    width: 56px;
  }
`;

function SearchBar(props) {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <SearchField />
      <SearchButton theme={theme}>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
}

export default SearchBar;
