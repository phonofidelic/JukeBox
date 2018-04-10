import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import { 
	Close
} from 'material-ui-icons';
import { withTheme } from 'material-ui/styles';



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
				SnackbarContentProps={{
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