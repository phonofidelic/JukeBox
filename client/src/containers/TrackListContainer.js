import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import TrackList from '../components/TrackList';

const actions = { ...trackListActions, ...playerActions };

class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();

	}

	handleSelectTrack(track) {
		this.props.selectTrack(track);
	}

	handleStartNewQue(track) {
		this.props.startNewQue(track);
	}

	handleAddToQue(track) {
		this.props.addToQue(track);
	}

	render() {
		// const { tracks, error, selectedTrack } = this.props.trackList;
		console.log(this.props)
		const { trackList } = this.props;
		return(
			<TrackList 
				tracks={trackList.tracks}
				selectedTrack={trackList.selectedTrack}
				handleSelectTrack={ this.handleSelectTrack.bind(this) }
				handleStartNewQue={ this.handleStartNewQue.bind(this) }
				handleAddToQue={ this.handleAddToQue.bind(this) }
			/> 
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList,
		// trackData: state.trackData
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);