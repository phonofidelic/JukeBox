import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { withTheme } from '@material-ui/core/styles';
import {
	Typography, 
	List, 
	ListItem,
	Button,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
  		handleReset,
  		handleRemoveTrack,
  	} = this.props;

  	const styles = {
  		root: {
  			position: 'absolute',
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0,
	      padding: '2.5em 0',
	      background: 'rgba(0,0,0,0.5)',
	      textAlign: 'center',
      	color: theme.palette.primary.light,
  		},
  		listItem: {
  			padding: '0px 16px',
  		},
  		listItemText: {
  			color: theme.palette.primary.light,
  		},
  		controlls: {
  			margin: '5px',
  			color: theme.palette.primary.light,
  		}
  	}

  	return (
  		<div style={styles.root}>
	  		<List>
	  			{droppedFiles.map((file, i) => 
	  				<ListItem key={i} style={styles.listItem}>
	  					<Typography style={styles.listItemText}>
	  						{file.name} | {file.size} kb
	  					</Typography>
	  					<IconButton style={{marginLeft: 5}} onClick={() => handleRemoveTrack(i)}><DeleteIcon/></IconButton>
	  				</ListItem>
	  			)}
	  		</List>

	  		<div>
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
    const { dropzoneActive } = this.state;
    const { input, name, droppedFiles, handleOnDrop } = this.props;
    const dropzoneStyle = {
    	position: 'absolute',
    	top: 0,
    	right: 0,
    	botom: 0,
    	left: 0,
    	width: '100%',
    	height: '100%',
    };

    // console.log('UploaderFullscreen, this.props:', this.props)

    return (
      <Dropzone
      	name={input.name}
        disableClick
        style={dropzoneStyle}
        accept={''}
        onDrop={handleOnDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && this.renderOverlay() }
        { droppedFiles.length > 0 && this.renderUploadList() }
      </Dropzone>
    );
  }
}

export default withTheme()(UploaderFullscreen);
