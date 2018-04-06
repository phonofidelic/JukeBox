import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';


class Message extends Component {

	render() {
		const { 
			messageData,
			context, 
			handleClearMessage 
		} = this.props;
		
		return (
			<Snackbar 
				anchorOrigin={{ 
					vertical: 'top',
					horizontal: 'center'
				}}
				open={Boolean(messageData)}
				SnackbarContentProps={{
      	  'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{messageData} context: {context}</span>}
        onClose={handleClearMessage}
        autoHideDuration={3200}
			/>
		);
	}
}

export default Message;