const styles = theme => ({
  root: {
    position: 'sticky',
    width: '100vw',
    height: theme.dimensions.libraryControls.height,
    top: theme.dimensions.header.height,
    // top: 0,
    zIndex: 1,
    background: theme.palette.secondary.light,
    borderBottom: `1px solid #ccc`,
    // boxShadow: '0px 0px 5px 1px #ccc'
    display: 'flex',
    justifyContent: 'flex-end'
  },
  orderByButton: {
    // height: theme.dimensions.libraryControls.height,
    // lineHeight: `${theme.dimensions.libraryControls.height}px`,
    // verticalAlign: 'middle',
    // paddingLeft: 10,
  },

  menuList: {
    background: theme.palette.secondary.light,
    width: '100vw',
    boxShadow: '0px 0px 20px 1px #ccc'
  },
  menuItem: {
    textAlign: 'center'
  }
});

export default styles;
