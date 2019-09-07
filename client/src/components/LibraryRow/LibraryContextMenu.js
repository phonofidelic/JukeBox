import React, { Component } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class LibraryContextMenu extends Component {
  render() {
    const {
      queue,
      contextMenuIsOpen,
      contextPos,
      handleMenuOptionStartNewQueue,
      handleMenuOptionAddToQueue,
      handleContextMenuClose,
      handleToggleEditMode,
      handleMenuOptionClickDelete
    } = this.props;

    const styles = {
      root: {
        padding: '0px',
        position: 'fixed',
        transformOrigin: 0
      }
    };

    // console.log('*** LibraryContextMenu, queue:', queue)
    return (
      <Menu
        style={styles.root}
        id="options-menu"
        getContentAnchorEl={null}
        open={Boolean(contextMenuIsOpen)}
        anchorEl={document.body}
        anchorOrigin={{
          vertical: contextPos.y + window.scrollY,
          horizontal: contextPos.x
        }}
        onClose={handleContextMenuClose}
      >
        {queue.length ? (
          <MenuItem onClick={handleMenuOptionAddToQueue}>Add to queue</MenuItem>
        ) : (
          <MenuItem onClick={handleMenuOptionStartNewQueue}>
            Start new queue
          </MenuItem>
        )}
        <Tooltip title="Feature coming soon" enterDelay={200}>
          <MenuItem
            style={{ cursor: 'not-allowed' }}
            onClick={handleToggleEditMode}
          >
            <Typography color={'textSecondary'}>Edit info</Typography>
          </MenuItem>
        </Tooltip>
        <MenuItem onClick={handleMenuOptionClickDelete}>Delete track</MenuItem>
      </Menu>
    );
  }
}

export default LibraryContextMenu;
