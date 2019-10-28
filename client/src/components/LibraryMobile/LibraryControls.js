import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/theme.context';

import { ORDER_TYPES } from './constants';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import ArrowDown from '@material-ui/icons/ExpandMore';
import ArrowUp from '@material-ui/icons/ExpandLess';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const orderMenu = [
  { type: ORDER_TYPES.TITLE, label: 'Title' },
  { type: ORDER_TYPES.ARTIST, label: 'Artist' },
  { type: ORDER_TYPES.ALBUM, label: 'Album' }
];

const Container = styled.div`
  position: sticky;
  width: 100vw;
  height: ${({ theme }) => theme.dimensions.libraryControls.height}px;
  top: ${({ theme }) => theme.dimensions.header.height}px;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.primary.background};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.border};
  display: flex;
`;

const Menu = styled(MenuList)`
  background-color: ${({ theme }) => theme.palette.primary.background};
  width: 100vw;
  box-shadow: ${({ theme }) => theme.palette.primary.boxShadow};
`;

const StyledMenuItem = styled(MenuItem)`
  text-align: left;
`;

const FieldButton = styled(Button)`
  && {
    flex: 5;
    padding-left: 16px;
    justify-content: flex-start;
  }
`;

const ToggleButton = styled(Button)`
  && {
    border-left: 1px solid ${({ theme }) => theme.palette.primary.border};
    border-radius: 0;
    // flex: 1;
    width: 56px;
  }
`;

function LibraryControls(props) {
  const { selectedField, order, setOrderBy, setOrder } = props;
  const [menuState, setMenuState] = useState(false);
  const theme = useContext(ThemeContext);

  const handleSelection = value => {
    console.log('handleSelection, value', value);
    setOrderBy(value);
    setMenuState(!menuState);
  };

  return (
    <Container theme={theme}>
      <FieldButton theme={theme} onClick={() => setMenuState(!menuState)}>
        {selectedField}
      </FieldButton>
      <ToggleButton theme={theme} onClick={() => setOrder()}>
        {order ? <ArrowDown /> : <ArrowUp />}
      </ToggleButton>
      <Drawer
        anchor="top"
        open={menuState}
        onClose={() => setMenuState(!menuState)}
      >
        <Menu theme={theme}>
          {orderMenu.map((orderItem, i) => (
            <StyledMenuItem
              key={i}
              value={orderItem.type}
              onClick={() => handleSelection(orderItem.type)}
            >
              {orderItem.label}
            </StyledMenuItem>
          ))}
        </Menu>
      </Drawer>
    </Container>
  );
}

export default LibraryControls;
