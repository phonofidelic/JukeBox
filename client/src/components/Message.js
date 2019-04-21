import React, { Component } from 'react';
import { ThemeContext } from '../contexts/theme.context';

import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

class Message extends Component {
	static contextType = ThemeContext;

	render() {
		const { 
			open,
			text,
			// context, 
			handleClearMessage,
		} = this.props;

		const theme = this.context;

		const styles = {
			root: {
				
				// textAlign: 'center',
				// width: '100%',
			},
			text: {
				color: `${theme.palette.primary.light}`,
				textAlign: 'center',
			}
		}

		return (
			<Snackbar 
				anchorOrigin={{ 
					vertical: 'top',
					horizontal: 'center'
				}}
				open={open}
				ContentProps={{
      	  'aria-describedby': 'message-id',
        }}
        message={
	      	<span id="message-id" style={styles.root} 
	      	>
	      		<Typography style={styles.text}>{text}</Typography>
	      	</span>
        }
        onClick={ () => { handleClearMessage() }}
        onClose={handleClearMessage}
        autoHideDuration={3200}
			/>
		);
	}
}

export default withTheme()(Message);