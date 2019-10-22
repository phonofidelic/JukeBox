import React, { Component } from 'react';
import styled from 'styled-components';

import {
  ThemeContext,
  getColorPrimaryLight,
  getPrimarySelected
} from '../../contexts/theme.context';

import EditTrackForm from './EditTrackForm';
import TrackListItemControls from './TrackListItemControls';
import playingThumb from '../assets/playing_thumb.svg';
import defaultAlbumThumb from '../assets/default_album_img.svg';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';

const Container = styled(ListItem)`
  background-color: ${props =>
    props.isSelected ? getPrimarySelected : getColorPrimaryLight};
  && {
    padding-right: 7px;
  }
`;

const ItemContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 59px;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin-left: 10px;
  margin-right: auto;
`;

const OptionsContainer = styled.div`
  // margin-left: auto;
  // width: 50px;
`;

class TrackListItem extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };
  }

  handleToggleEditMode() {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
  }

  handleClick = () => {
    console.log('click!', this.props.track);
    this.props.handleSelectTrack(this.props.track);
  };

  render() {
    const {
      track,
      player,
      selectedTrack,
      handleSelectTrack,
      handleEditTrackData,
      handleStartNewQueue,
      handleAddToQueue,
      handleDeleteTrack,
      // handleToggleEditMode,
      handleOpenDetailView
    } = this.props;

    const theme = this.context;

    const { editMode } = this.state;

    const isSelected = selectedTrack && track._id === selectedTrack._id;

    const styles = {
      root: {
        // borderBottom: `1px solid ${theme.palette.primary.main}`,
        // padding: '10px'
        // borderLeft: `solid ${theme.palette.primary.light} 5px`,
      },
      selected: {
        background: theme.palette.primary.selected
        // // height: '50px',
        // lineHeight: '50px',
        // verticalAlign: 'middle,'
      },
      defaultImgContainer: {
        width: '50px',
        height: '50px',
        display: 'flex',
        background: theme.palette.primary.main
      },
      defaultImg: {
        margin: 'auto',
        color: theme.palette.primary.light
      },
      playing: {
        // borderLeft: `solid ${theme.palette.secondary.main} 5px`,
        // background: theme.palette.secondary.main,
        // backgroundSize: '50px'
        zIndex: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .5)'
      }
    };

    return (
      <Container
        onClick={() => handleSelectTrack(track)}
        divider
        theme={theme}
        style={isSelected ? styles.selected : styles.root}
        dense={true}
      >
        {editMode ? (
          <Grid container alignItems="center">
            <EditTrackForm
              track={track}
              handleEditTrackData={handleEditTrackData}
              handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            />
          </Grid>
        ) : (
          <ItemContentContainer>
            <ImageContainer
              onClick={() => handleStartNewQueue(track, player.currentTrack)}
            >
              {player.playing && player.currentTrack._id === track._id && (
                <img
                  src={playingThumb}
                  style={styles.playing}
                  alt="Playing..."
                  width="50"
                  height="50"
                />
              )}
              <img
                src={
                  track.image.src.match(/default/)
                    ? defaultAlbumThumb
                    : track.image.src
                }
                alt="Album art"
                width="50"
                height="50"
              />
            </ImageContainer>

            <TextContainer
              onClick={() => handleStartNewQueue(track, player.currentTrack)}
            >
              <div>
                <Typography style={{ maxWidth: '250px' }} noWrap>
                  {track.title}
                </Typography>
              </div>
              <div>
                <Typography
                  style={{ maxWidth: '250px' }}
                  noWrap
                  variant="caption"
                >
                  {track.artist.name}
                </Typography>
              </div>
              <div>
                <Typography
                  style={{ maxWidth: '250px' }}
                  noWrap
                  variant="caption"
                >
                  {track.album.title}
                </Typography>
              </div>
              {/* isSelected && <div><Typography noWrap variant="caption">{ track.format.duration || 'no durration' }</Typography></div> */}
            </TextContainer>

            <OptionsContainer>
              <TrackListItemControls
                track={track}
                player={player}
                handleStartNewQueue={handleStartNewQueue}
                handleAddToQueue={handleAddToQueue}
                handleDeleteTrack={handleDeleteTrack}
                handleToggleEditMode={this.handleToggleEditMode.bind(this)}
                handleOpenDetailView={handleOpenDetailView}
              />
            </OptionsContainer>
          </ItemContentContainer>
        )}
      </Container>
    );
  }
}

export default withTheme(TrackListItem);
