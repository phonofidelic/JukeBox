import React, { Component } from 'react';
import { 
	Backdrop,
	CircularProgress,
} from '@material-ui/core';

class Loader extends Component {
	render() {
		const styles = {
			root: {
				position : 'fixed',
				zIndex: 2,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			},
			progress: {
				marginTop: '40vh'
			}
		}

		return (
				<div style={styles.root}>
					<CircularProgress style={styles.progress} />
				</div>
		);
	}
}

export default Loader;