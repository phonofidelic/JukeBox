import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/trackListActions';
import TrackList from '../components/TrackList';

class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
	}

	handleSelectTrack(track) {
		this.props.selectTrack(track);
	}

	render() {
		const { tracks, error, selectedTrack } = this.props.trackList;
		return(
			!error ? 
			<TrackList 
				tracks={tracks} 
				handleSelectTrack={this.handleSelectTrack.bind(this)}
				selectedTrack={selectedTrack} 
			/> 
			: 
			<div>There was an error: {error.message}</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);