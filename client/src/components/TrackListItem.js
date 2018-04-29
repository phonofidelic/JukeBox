import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { 
	Album
} from 'material-ui-icons';
import EditTrackForm from './EditTrackForm';
import TrackListItemControls from './TrackListItemControls';

function blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
}

class TrackListItem extends Component {
	state = {
		editMode: false
	}

	handleToggleEditMode() {
		this.setState({
			...this.state,
			editMode: !this.state.editMode
		});
	}

	handleImageLoad(picture) {
		console.log('picture:', picture)
		const arrayBuffer = new ArrayBuffer(picture.data);
		const blob =  new Blob([picture.data], {type: picture.format});
		// const imageUrl = new URL(`data:image/${picture.format},${blob}`);
		var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    var urlString = `${imageUrl}.${picture.format}`.replace('blob:htto', '');
    console.log('imageUrl', imageUrl);
    console.log('arrayBuffer', picture.data)
    console.log('blob', blob)
    	

    // return blobToDataURL(blob)
    // .then(result => {
    // 	console.log('blobToDataURL:', new URL(`data:image/${picture.format},${result}`))
    // 	return new URL(`data:image/${picture.format},${result}`);
    // })
    // .catch(err => console.error('blobToDataURL, error:', err))
    
		return imageUrl;
	}

	// readImgBuffer(picture) {
	// 	var base64String = '';
	// 	for (var i = 0; i < picture.data)
	// }

	render() {
		const { 
			track,
			player,
			selectedTrack,
			handleSelectTrack,
			handlePostTrackData,
			handleStartNewQueue,
			handleAddToQueue,
			handleDeleteTrack,
			handleToggleEditMode,
			theme
		} = this.props;

		const styles = {
			root: {
				borderBottom: `1px solid ${theme.palette.primary.main}`,
				padding: '10px'
			},
			selected: {
				background: theme.palette.primary.main,
				// height: '50px',
				lineHeight: '50px',
				verticalAlign: 'middle,'
			}
		};
	
		// [CONTRACT]
		// * selectedTrack && track._id ?
		//	 Use styles.selected css
		//	 Otherwise, use syles.root css
		//
		// * this.state.editMode ?
		//	 render EditTrackForm with track prop
		//	 
		// * selectedTrack && track._id === selectedTrack._id ?
		return (	
			<ListItem 
				onClick={() => handleSelectTrack(track)}
				style={
					selectedTrack && track._id === selectedTrack._id ? 
					styles.selected 
					: 
					styles.root
				}
			>
				{
					this.state.editMode ?
					<Grid container alignItems="center">
						<EditTrackForm
							track={track}
							handlePostTrackData={handlePostTrackData}
							handleToggleEditMode={this.handleToggleEditMode.bind(this)}
						/>
					</Grid>
					:
					<Grid container alignItems="center">
						<Grid item xs={2}>
							{
								track.image.src === 'defaultImage' ?
								<Album />
								:
								<img src={track.image.src} alt="Album art" width="50" height="50" />
							}
						</Grid>
						<Grid item xs={5}>
							<Grid container direction="column">
								<div><Typography noWrap>{ track.title }</Typography></div>
								<div><Typography noWrap variant="caption">{ track.artist }</Typography></div>
								<div><Typography noWrap variant="caption">{ track.album }</Typography></div>
							</Grid>
						</Grid>
						{ 
							selectedTrack && track._id === selectedTrack._id ? 
							<Grid item xs={5}>
									<TrackListItemControls 
										track={track}
										player={player}
										handleStartNewQueue={handleStartNewQueue}
										handleAddToQueue={handleAddToQueue}
										handleDeleteTrack={handleDeleteTrack}
										handleToggleEditMode={this.handleToggleEditMode.bind(this)}
									/>
							</Grid>
							: 
							null
						}
					</Grid>
				}
			</ListItem>
		);
	}
}

export default withTheme()((TrackListItem));
