import React, { Component } from 'react';
import axios from 'axios';

const getTracks = () => {
	return axios.get('/tracks')
	.then(response => {
		console.log('getTracks, response:', response.data);
		return response.data.data;
	})
	.catch(err => console.error('getTracks error:', err));
}

class Prototype extends Component {
	constructor(props) {
		super(props);
		// axios.get('/tracks')
		// .then(response => {
		// 	console.log('getTracks, response:', response.data);
		// 	this.setState({tracks: response.data.data});
		// })
		// .catch(err => console.error('getTracks error:', err));
	}


	render() {
		console.log('state:', this.state)
		return (
			<form method="post" 
						action="/tracks" 
						target="_blank" 
						encType="multipart/form-data">
				<div>
					<label htmlFor="trackName">Name</label>
					<input id="trackName" type="text" name="trackName" />
				</div>
				<div>
					<label htmlFor="file">File</label>
					<input id="file" type="file" name="selectedFile" />
				</div>
				<div>
					<input type="submit" value="upload" />
				</div>
			</form>
		);
	}
}

export default Prototype;