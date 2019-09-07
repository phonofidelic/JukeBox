import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../contexts/theme.context';

import LibraryContextMenu from './LibraryContextMenu';
import playingThumb from '../assets/playing_thumb.svg';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import withTheme from '@material-ui/core/styles/withTheme';

import * as moment from 'moment';
import 'moment-duration-format';

export class LibraryRow extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      anchorEl: null,
      contextMenuIsOpen: false,
      contextPos: { x: 0, y: 0 }
    };
  }

  handleContextMenuOpen = e => {
    e.preventDefault();
    // console.log('handleContextMenuOpen, e:', e)
    this.setState({
      ...this.state,
      contextMenuIsOpen: true,
      contextPos: { x: e.clientX, y: e.clientY }
    });
  };

  handleContextMenuClose() {
    console.log('*** handleContextMenuClose');
    this.setState({
      ...this.state,
      contextMenuIsOpen: false,
      contextPos: { x: 0, y: 0 }
    });
  }

  handleToggleEditMode() {
    console.log('handleToggleEditMode, state:', this.state);
    this.setState({ ...this.state, editMode: !this.state.editMode });
  }

  handleMenuOptionStartNewQueue = () => {
    this.props.handleStartNewQueue(this.props.track);
    this.handleContextMenuClose();
  };

  handleMenuOptionAddToQueue = () => {
    this.props.handleAddToQueue(this.props.track);
    this.handleContextMenuClose();
  };

  handleMenuOptionClickDelete() {
    this.props.handleDeleteTrack(this.props.track);
    this.handleContextMenuClose();
  }

  renderTrackThumb() {
    const {
      track,
      player
      // theme,
    } = this.props;

    const styles = {
      playing: {
        // zIndex: 2,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .5)'
      }
    };

    return (
      <div>
        {player.playing && player.currentTrack._id === track._id && (
          <img
            src={playingThumb}
            style={styles.playing}
            alt="Playing..."
            width="32"
            height="32"
          />
        )}
        <img src={track.image.src} alt="Album art" width="32" height="32" />
      </div>
    );
  }

  render() {
    const {
      track,
      player,
      selectedTrack,
      handleSelectTrack,
      // handleEditTrackData,
      handleStartNewQueue,
      handleOpenDetailView
    } = this.props;

    const {
      contextMenuIsOpen,
      contextPos
      // editMode
    } = this.state;

    const theme = this.context;

    const styles = {
      root: {
        cursor: 'pointer'
      },
      imageCell: {
        paddingLeft: 20,
        paddingRight: 10,
        maxWidth: '32px'
        // textAlign: 'right'
      },
      titleCell: {
        paddingLeft: 0,
        paddingRight: 20,
        maxWidth: '200px'
      },
      durationCell: {
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: '50px'
      },
      artistCell: {
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: '200px'
      },
      albumCell: {
        paddingLeft: 20,
        maxWidth: '200px'
      },
      selected: {
        background: theme.palette.secondary.light
      }
    };

    const mDuration = moment
      .duration(Math.floor(track.format.duration), 'seconds')
      .format('mm:ss', { forceLength: false });

    return (
      <TableRow
        key={track._id}
        hover
        onClick={() => handleSelectTrack(track)}
        onContextMenu={this.handleContextMenuOpen}
        onDoubleClick={() => handleStartNewQueue(track, player.currentTrack)}
        style={
          selectedTrack && selectedTrack._id === track._id
            ? { ...styles.root, ...styles.selected }
            : { ...styles.root }
        }
      >
        <TableCell style={styles.imageCell}>
          {this.renderTrackThumb()}
        </TableCell>
        <TableCell style={styles.titleCell}>
          <Tooltip title={track.title} placement="top-start" enterDelay={300}>
            <Typography noWrap>{track.title}</Typography>
          </Tooltip>
        </TableCell>
        <TableCell style={styles.durationCell}>
          <Typography noWrap>{mDuration}</Typography>
        </TableCell>
        <TableCell style={styles.artistCell}>
          <Tooltip
            title={track.artist.name}
            placement="top-start"
            enterDelay={300}
          >
            <Typography
              noWrap
              onClick={() => handleOpenDetailView(track.artist._id, 'artist')}
            >
              {track.artist.name}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell style={styles.albumCell}>
          <Tooltip
            title={track.album.title}
            placement="top-start"
            enterDelay={300}
          >
            <Typography
              noWrap
              onClick={() => handleOpenDetailView(track.album._id, 'album')}
            >
              {track.album.title}
            </Typography>
          </Tooltip>
        </TableCell>
        {
          <LibraryContextMenu
            queue={player.queue}
            contextMenuIsOpen={contextMenuIsOpen}
            contextPos={contextPos}
            handleContextMenuClose={this.handleContextMenuClose.bind(this)}
            handleMenuOptionStartNewQueue={this.handleMenuOptionStartNewQueue}
            handleMenuOptionAddToQueue={this.handleMenuOptionAddToQueue}
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            handleMenuOptionClickDelete={this.handleMenuOptionClickDelete.bind(
              this
            )}
          />
        }
      </TableRow>
    );
  }
}

LibraryRow.propTypes = {
  track: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  selectedTrack: PropTypes.object,
  handleSelectTrack: PropTypes.func.isRequired,
  handleEditTrackData: PropTypes.func.isRequired,
  handleStartNewQueue: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
  handleOpenDetailView: PropTypes.func.isRequired
};

export default withTheme(LibraryRow);
