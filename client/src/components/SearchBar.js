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
  margin: 0
    ${({ theme, userAgentIsMobile }) =>
      userAgentIsMobile ? 0 : theme.dimensions.navDesktop.width + 12}px;
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
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const SearchButton = styled(Button)`
  height: 56px;
  && {
    border-left: 1px solid ${({ theme }) => theme.palette.primary.border};
    border-right: 1px solid
      ${({ theme, userAgentIsMobile }) =>
        userAgentIsMobile ? 'none' : theme.palette.primary.border};
    border-radius: 0;
    width: 56px;
  }
`;

function SearchBar(props) {
  const theme = useContext(ThemeContext);
  const inputEl = useRef(null);
  const [debouncedSearch] = useDebouncedCallback(
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
    <Container theme={theme} userAgentIsMobile={props.userAgentIsMobile}>
      <SearchFieldContainer searchIsOpen={props.searchIsOpen}>
        <SearchField
          type="text"
          inputRef={inputEl}
          onChange={e => debouncedSearch(e.target.value)}
        />
      </SearchFieldContainer>
      <SearchButton
        theme={theme}
        userAgentIsMobile={props.userAgentIsMobile}
        onClick={handleSearchClick}
      >
        {props.searchIsOpen ? <CloseIcon /> : <SearchIcon />}
      </SearchButton>
    </Container>
  );
}

export default SearchBar;
