import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';

class Message extends Component {

	render() {
		const { 
			open,
			text,
			context, 
			handleClearMessage,
			theme
		} = this.props;

		const styles = {
			root: {
				background: `${theme.palette.context[context]}`
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
	      		{text}
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