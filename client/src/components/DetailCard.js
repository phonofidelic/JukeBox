import React, { Component } from 'react';

import defaultAlbumImage from './assets/default_album_img.svg';
import defaultArtistImage from './assets/default_artist_img.svg';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

class DetailCard extends Component {
  state = {
    // open: false
    isMobile: navigator.userAgent.indexOf('Mobile') > 0 ? true : false
  };

  handleClose() {
    // this.setState({ open: false })
    this.props.handleCloseDetailView();
  }

  render() {
    const { detailViewData } = this.props;

    const { isMobile } = this.state;

    const imgWidth = isMobile ? window.innerWidth : 600;
    const imgHeight = isMobile ? window.innerWidth : 600;

    const PLACEHOLDER_IMAGE = `http://placekitten.com/${imgWidth}/${imgHeight}`;

    const styles = {
      root: {
        top: 0,
        zIndex: 3000
      },
      cardMedia: {
        width: 600,
        height: 400,
        margin: 0
      },

      dialog: {
        // width: '100%',
      },
      dialogContent: {
        padding: '0px'
      },
      dialogText: {
        paddingLeft: 24,
        paddingRight: 24
      }
    };

    return (
      <div style={styles.root}>
        <Dialog
          style={styles.dialog}
          fullScreen={isMobile}
          open={Boolean(detailViewData)}
          scroll="paper"
        >
          {detailViewData && (
            <DialogContent style={styles.dialogContent}>
              <div>
                <img
                  src={
                    detailViewData.imgSrc.match(/default/)
                      ? detailViewData.imgSrc.match(/album/)
                        ? defaultAlbumImage
                        : defaultArtistImage
                      : detailViewData.imgSrc
                  }
                  width={imgWidth}
                  height={imgHeight}
                  alt="Album artwork"
                />
              </div>
              <DialogTitle>
                {detailViewData.name || detailViewData.title}
              </DialogTitle>
              <DialogContentText style={styles.dialogText}>
                {detailViewData.description}
              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            {/* <Button>More info</Button> */}
            <Button onClick={() => this.handleClose()}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DetailCard;
