import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
// import debounce from 'lodash/debounce';
import { useDebouncedCallback } from 'use-debounce';
import { ThemeContext } from '../contexts/theme.context';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex: auto;
  align-items: baseline;
`;

const SearchFieldContainer = styled.div`
  flex: 1;
  & > div {
    display: ${({ searchIsOpen }) => (searchIsOpen ? 'flex' : 'none')};
  }
`;

const SearchField = styled(TextField)`
  && {
    // flex: 5;
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
  const inputEl = useRef(null);
  const [text, setText] = useState('');
  const [debouncedCallback] = useDebouncedCallback(
    term => props.searchLibrary(term),
    500
  );

  const handleSearchClick = () => {
    props.toggleSearch();
    setTimeout(() => {
      inputEl.current.focus();
    }, 100);
  };

  return (
    <Container>
      <SearchFieldContainer searchIsOpen={props.searchIsOpen}>
        <SearchField
          type="text"
          inputRef={inputEl}
          onChange={e => debouncedCallback(e.target.value)}
        />
      </SearchFieldContainer>
      <SearchButton theme={theme} onClick={handleSearchClick}>
        {props.searchIsOpen ? <CloseIcon /> : <SearchIcon />}
      </SearchButton>
    </Container>
  );
}

export default SearchBar;
