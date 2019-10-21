import React, { Component } from 'react';
import styles from './LibraryControls.styles';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/ExpandMore';
import ArrowUp from '@material-ui/icons/ExpandLess';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';

const ORDER_TYPES = {
  TITLE: 'title',
  ARTIST: 'artist',
  ALBUM: 'album'
};

const orderMenu = [
  { type: ORDER_TYPES.TITLE, label: 'Title' },
  { type: ORDER_TYPES.ARTIST, label: 'Artist' },
  { type: ORDER_TYPES.ALBUM, label: 'Album' }
];

class LibraryControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
      // orderBy: ORDER_TYPES.TITLE,
      // top: false
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleOrderBy = value => {
    console.log('handleSelection, value', value);
    this.props.setOrderBy(value);
    this.handleToggle();
  };

  handleOrder = () => {
    this.props.setOrder();
    // this.handleToggle();
  };

  render() {
    const { orderBy, order, classes } = this.props;

    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Button
          // fullWidth
          className={classes.orderByButton}
          onClick={this.handleToggle}
        >
          {orderBy}
        </Button>
        <Drawer anchor="top" open={open} onClose={this.handleToggle}>
          <MenuList className={classes.menuList}>
            {orderMenu.map((orderItem, i) => (
              <MenuItem
                key={i}
                className={classes.menuItem}
                value={orderItem.type}
                onClick={() => this.handleOrderBy(orderItem.type)}
              >
                {orderItem.label}
              </MenuItem>
            ))}
          </MenuList>
        </Drawer>
        <Button onClick={() => this.handleOrder()}>
          <IconButton size="small" style={{ padding: 0 }}>
            {order ? <ArrowDown /> : <ArrowUp />}
          </IconButton>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LibraryControls);
