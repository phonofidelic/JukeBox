// /********************************************************************************
//   Adapted from https://material-ui-next.com/demos/dialogs/#responsive-full-screen
//  ********************************************************************************/

// import React from 'react';
// import Button from 'material-ui/Button';
// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from 'material-ui/Dialog';

// class AlertDialog extends React.Component {
//   state = {
//     open: false,
//   };

//   handleClickOpen = () => {
//     console.log('baaaajs')
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//     this.props.onAlertClose();
//   };

//   handleActionCancel() {

//   }

//   handleActionConfirm() {
    
//   }

//   render() {
//     const { 
//       triggerButtonText, 
//       headerText,
//       bodyText, 
//       actionCancelButtonText, 
//       actionConfirmButtonText,
//       handleActionConfirm
//     } = this.props;

//     return (
//       <div onClick={this.handleClickOpen}>
//         <span>{triggerButtonText}</span>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">{headerText}</DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               {bodyText}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary" autoFocus>
//               {actionCancelButtonText}
//             </Button>
//             <Button onClick={handleActionConfirm} color="primary">
//               {actionConfirmButtonText}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }

// export default AlertDialog;

