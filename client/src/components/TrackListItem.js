import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withTheme } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { 
	PlayArrow,
	Queue,
	MoreVert,
	Cancel,
	Done
} from 'material-ui-icons';
import TextField from 'material-ui/TextField';
import EditTrackForm from './EditTrackForm';

const form = reduxForm({
	form: 'editTrackForm'
});

const renderField = ({
 input, 
 label, 
 meta: { touched, error }, 
 children, 
 ...custom 
}) => (
	<TextField
		{...input}
		{...custom} 
	/>
);

function validate(formProps) {
	const errors = {};

	if (!formProps.name) {
		errors.name = 'Please enter a track name'
	}
	return errors;
};

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.primary.main
  },
});

class TrackListItem extends Component {
	state = {
		anchorEl: null,
		editMode: false
	}

	handleOptionsClick(e) {
		this.setState({anchorEl: e.currentTarget});
	}

	handleOptionsClose(e) {
		this.setState({anchorEl: null});
	}

	handelSelectEdit() {
		this.setState({
			...this.state,
			anchorEl: null,
			editMode: true
		});
	}

	handleToggleEditMode() {
		this.setState({
			...this.state,
			editMode: !this.state.editMode
		});
	}

	renderControlls() {
		// TODO: onClick = addToQue (?)
		const { 
			track,
			currentTrack,
			queue,
			handleStartNewQueue,
			handleAddToQueue,
			handleDeleteTrack
		} = this.props;

		const { anchorEl } = this.state;

		const styles = {
			menue: {
				padding: '0px'
			}
		}

		return (
			<Grid item xs={4}>				
				<IconButton title="Start new queue" onClick={ () => { handleStartNewQueue(track, currentTrack) }} >
				<PlayArrow />
				</IconButton>
				{
					queue.length ? 
					<IconButton title="Add to queue" onClick={ () => { handleAddToQueue(track) }}> 
						<Queue />
					</IconButton>
					: 
					null
				}
				<IconButton 
					title="Options"
					aria-owns={anchorEl ? 'options-menu' : null}
					aria-haspopup="true"
					onClick={this.handleOptionsClick.bind(this)}
					>
					<MoreVert />
				</IconButton>
				<Menu
					id="options-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleOptionsClose.bind(this)}
					style={styles.menu}
				>
					<MenuItem onClick={this.handelSelectEdit.bind(this)}>Edit Track</MenuItem>
					<MenuItem onClick={() => handleDeleteTrack(track)}>Delete Track</MenuItem>
				</Menu>
			</Grid>
		);
	}

	render() {
		const { 
			track,
			handleSelectTrack,
			handlePostTrackData,
			selectedTrack,
			theme
		} = this.props;

		const styles = {
			selected: {
				background: theme.palette.primary.main,
				height: '50px',
				lineHeight: '50px'
			}
		};

		return (
			
			<ListItem 
				onClick={() => handleSelectTrack(track)}
				style={
					selectedTrack && track._id === selectedTrack._id ? 
					styles.selected 
					: 
					{}
				}
			>
				{
					this.state.editMode ?
					<EditTrackForm
						track={track}
						handlePostTrackData={handlePostTrackData}
						handleToggleEditMode={this.handleToggleEditMode.bind(this)}
					/>
					:
					<Grid container alignItems={'center'}>
						<Grid item xs={8}><Typography>{ track.name }</Typography></Grid>
						{ selectedTrack && track._id === selectedTrack._id ? this.renderControlls() : null }
					</Grid>
				}
			</ListItem>
		);
	}
}

export default withTheme()((TrackListItem));
