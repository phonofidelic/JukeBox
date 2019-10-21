import React, { Component } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import TrackListItemContainer from '../../containers/TrackListItemContainer';
import LibraryControls from './LibraryControls';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import withTheme from '@material-ui/core/styles/withTheme';

const ORDER_TYPES = {
  TITLE: 'title',
  ARTIST: 'artist',
  ALBUM: 'album'
};

export class LibraryMobile extends Component {
  static contextType = ThemeContext;

  state = {
    orderBy: ORDER_TYPES.TITLE
  };

  setOrder(type) {
    this.setState({
      orderBy: type
    });
  }

  render() {
    const { library, handleOrderBy, queueHasTracks } = this.props;

    const theme = this.context;

    const styles = {
      root: {
        background: theme.palette.primary.main
      },
      list: {
        // position: 'fixed',
        width: '100%',
        // top: theme.dimensions.libraryControls.height,
        // paddingTop: theme.dimensions.libraryControls.height,
        padding: 0
        // bottom: queueHasTracks
        //   ? theme.dimensions.player.height + theme.dimensions.navMobile.height
        //   : theme.dimensions.player.height,
        // overflowY: 'scroll',
        // WebkitOverflowScrolling: 'touch'
      }
    };

    return (
      <div style={styles.root}>
        <LibraryControls
          orderBy={this.state.orderBy}
          setOrder={this.setOrder.bind(this)}
          handleOrderBy={handleOrderBy}
        />
        <List style={styles.list}>
          {library.tracks.length > 0 ? (
            library.tracks.map(track => (
              <TrackListItemContainer key={track._id} track={track} />
            ))
          ) : (
            <Typography>No tracks in Library</Typography>
          )}
        </List>
      </div>
    );
  }
}

export default withTheme(LibraryMobile);
