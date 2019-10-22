import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/theme.context';

import TrackListItemContainer from '../../containers/TrackListItemContainer';
import LibraryControls from './LibraryControls';
import { ORDER_TYPES } from './constants';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import withTheme from '@material-ui/core/styles/withTheme';

const DESC = 'desc';
const ASCE = 'asce';

export class LibraryMobile extends Component {
  static contextType = ThemeContext;

  state = {
    selectedField: ORDER_TYPES.TITLE,
    order: ASCE,
    desc: true
  };

  setOrderBy(type, order) {
    this.setState({ selectedField: type }, () =>
      this.props.handleOrderBy(type, this.state.desc ? DESC : ASCE)
    );
  }

  setOrder() {
    this.setState({ desc: !this.state.desc }, () =>
      this.props.handleOrderBy(
        this.state.selectedField,
        this.state.desc ? DESC : ASCE
      )
    );
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
        // top:
        //   theme.dimensions.libraryControls.height +
        //   theme.dimensions.header.height +
        //   1,
        // paddingTop: theme.dimensions.libraryControls.height,
        padding: 0,
        // bottom: queueHasTracks
        //   ? theme.dimensions.player.height + theme.dimensions.navMobile.height
        //   : theme.dimensions.player.height,
        // overflowY: 'scroll',
        // WebkitOverflowScrolling: 'touch'
        paddingBottom:
          theme.dimensions.navMobile.height +
          (queueHasTracks ? theme.dimensions.player.height : 0)
      }
    };

    return (
      <div style={styles.root}>
        <LibraryControls
          selectedField={this.state.selectedField}
          order={this.state.desc}
          setOrderBy={this.setOrderBy.bind(this)}
          setOrder={this.setOrder.bind(this)}
          // handleOrderBy={handleOrderBy}
        />
        <List style={styles.list}>
          {library.tracks.length > 0 ? (
            library.searchIsOpen ? (
              library.searchResults.map(track => (
                <TrackListItemContainer key={track._id} track={track} />
              ))
            ) : (
              library.tracks.map(track => (
                <TrackListItemContainer key={track._id} track={track} />
              ))
            )
          ) : (
            <Typography>No tracks in Library</Typography>
          )}
        </List>
      </div>
    );
  }
}

export default withTheme(LibraryMobile);
