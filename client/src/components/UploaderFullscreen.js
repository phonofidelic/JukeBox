import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';
import {
  Button,
  Checkbox,
  IconButton,
	List, 
	ListItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
	Typography,
} from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

class UploaderFullscreen extends Component {
  state = {
    dropzoneActive: false,
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  renderOverlay() {
  	const { theme }  = this.props;
  	const styles = {
	  	root: {
	      position: 'absolute',
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0,
	      padding: '2.5em 0',
	      background: 'rgba(0,0,0,0.5)',
	      zIndex: 1001,
	      textAlign: 'center',
	      color: theme.palette.primary.light,
	    },
	    infoText: {
	    	color: theme.palette.primary.light,
	    },
	  };

  	return (
  		<div style={styles.root}>
  			<Typography style={styles.infoText}>Drop audio files for upload...</Typography>
  		</div>
  	);
  }

  renderUploadList() {
  	const { 
  		input, 
  		theme, 
  		droppedFiles,
      allDiscogsImport,
  		handleReset,
  		handleRemoveTrack,
      handleSelectDiscogsImport,
      handleSelectAllDiscogsImport,
  	} = this.props;

  	const styles = {
  		root: {
  			// position: 'absolute',
	    //   top: 0,
	    //   right: 0,
	    //   bottom: theme.dimensions.nav.navHeight,
	    //   left: 0,
        marginBottom: theme.dimensions.nav.navHeight,
        marginLeft: theme.dimensions.navDesktop.navWidth,
	      padding: '2.5em 0',
	      // background: 'rgba(0,0,0,0.5)',
	      textAlign: 'center',
      	// color: theme.palette.primary.light,
  		},
  		listItem: {
  			padding: '0px 16px',
  		},
      controllsContainer: {
        position: 'fixed',
        bottom: 0,
        paddingBottom: theme.dimensions.player.height,
        textAlign: 'center',
        background: '#fff',
        width: '100%',
      },
  		controlls: {
  			margin: '5px',
  			// color: theme.palette.primary.light,
  		}
  	}

  	return (
  		<div style={styles.root}>
	  		<Table>
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>File size</TableCell>
              <TableCell numeric>Import meta-data from Discogs?<Checkbox checked={allDiscogsImport} onChange={() => handleSelectAllDiscogsImport()} /></TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

	  			{droppedFiles.map((file, i) => 
	  				<TableRow hover key={i} style={styles.listItem}>
              <TableCell>
  	  					<Typography>{file.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{file.size} kb</Typography>
              </TableCell>
              <TableCell numeric>
                <Checkbox
                  checked={file.importDiscogsData} 
                  onChange={() => handleSelectDiscogsImport(i)} 
                />
              </TableCell>
              <TableCell>
	  					  <IconButton 
                  style={{marginLeft: 5}} 
                  onClick={() => handleRemoveTrack(i)}
                >
                  <RemoveCircle/>
                </IconButton>
              </TableCell>
	  				</TableRow>
	  			)}

          </TableBody>
	  		</Table>

	  		<div style={styles.controllsContainer}>
		  		<Button 
		  			style={styles.controlls}
		  			type="submit"
		  		>Submit</Button>
		  		<Button 
		  			style={styles.controlls}
		  			onClick={() => handleReset()}
		  		>Cancel</Button>
		  	</div>
	  	</div>
  	);
  }

  render() {
    const { 
      input, 
      name, 
      droppedFiles, 
      handleOnDrop, 
      theme,
    } = this.props;

    const { dropzoneActive } = this.state;

    const styles = {
    	root: {
        position: 'absolute',
        top: 0,
        right: 0,
        botom: theme.dimensions.nav.navHeight,
        left: 0,
        width: '100%',
        height: '100%',
      },
      infoText: {
        position: 'fixed',
        top: '33vh',
        width: '100%',
        textAlign: 'center',
      },
    };

    // console.log('UploaderFullscreen, this.props:', this.props)

    return (
      <Dropzone
      	name={input.name}
        disableClick
        style={styles.root}
        accept={''}
        onDrop={handleOnDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && this.renderOverlay() }
        { 
          droppedFiles.length > 0 
          ? this.renderUploadList()
          : <Typography style={styles.infoText}>Drag and drop files to upload</Typography>
         }
      </Dropzone>
    );
  }
}

export default withTheme()(UploaderFullscreen);
