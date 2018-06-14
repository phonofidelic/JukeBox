import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { withTheme } from '@material-ui/core/styles';
import {
	Typography, 
	List, 
	ListItem,
	Button,
} from '@material-ui/core';

// TODO: Make this a HOC, then implement TrackList as WithUploader(Tracklist)
// export const withUploader = ({ compontnet: Component, ...rest })

class UploaderFullscreen extends Component {
  constructor() {
    super()
    this.state = {
      dropzoneActive: false,
      files: []
    }
    // this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
  	const {input} = this.props;
  	input.onChange(this.state.files);
  	console.log('input.onChange, this.state.files:', this.state.files)
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

  onDrop(files) {
  	const {input} = this.props;
    // this.setState({
    //   dropzoneActive: false,
    //   files: [...this.state.files, ...files]
    // });
    this.setState((state) => ({
    	dropzoneActive: false,
      files: [...state.files, ...files]
    }));
    input.onChange([...this.state.files, ...files]);
    // console.log('input.value:', input.value)
    console.log('this.state.files:', [...this.state.files, ...files])
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
	      textAlign: 'center',
	      color: theme.palette.primary.light,
	    },
	    infoText: {
	    	color: theme.palette.primary.light,
	    },
	  };

  	return (
  		<div style={styles.root}>
  			<Typography style={styles.infoText}>Drop audo files for upload...</Typography>
  		</div>
  	);
  }

  renderUploadList() {
  	const { input, theme } = this.props;
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
  		controlls: {
  			margin: '5px',
  			color: theme.palette.primary.light,
  		}
  	}

  	return (
  		<div style={styles.root}>
	  		<List>
	  			{this.state.files.map((file, i) => <ListItem key={i}>{file.name} - {file.size}</ListItem>)}
	  		</List>

	  		<div>
		  		<Button 
		  			style={styles.controlls}
		  			type="submit"
		  		>Submit</Button>
		  		<Button 
		  			style={styles.controlls}
		  			onClick={() => this.props.reset()}
		  		>Cancel</Button>
		  	</div>
	  	</div>
  	);
  }

  render() {
    const { dropzoneActive } = this.state;
    const { input } = this.props;
    const dropzoneStyle = {
    	position: 'absolute',
    	top: 0,
    	right: 0,
    	botom: 0,
    	left: 0,
    	// background: 'green',
    	width: '100%',
    	height: '100%',
    	// pointerEvents: 'none',
    };
    
    // console.log('UploaderFullscreen, this:', this)
    return (
      <Dropzone
      	name={input.name}
        disableClick
        style={dropzoneStyle}
        accept={''}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && this.renderOverlay() }
        { this.state.files.length > 0 && this.renderUploadList() }
      </Dropzone>
    );
  }
}

export default withTheme()(UploaderFullscreen);
