import { 
	CLEAR_MESSAGE, 
	CLEAR_ALERT,
	SET_ALERT
} from '../actiontypes';

export const clearMessage = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_MESSAGE
		});
	};
}

export const triggerAlert = (alert, pendingAction, data) => {
	console.log('[LOG] triggerAlert, args', [alert, pendingAction, data])
	return dispatch => {
		dispatch({
			type: SET_ALERT,
			alert: alert,
			pendingAction: pendingAction,
			pendingActionData: data
		});
		// TODO: Create Promise that resolves on confirmAction, 
		//			 rejects on cancelAction?
		console.log('[LOG] pendingAction:', pendingAction)
		console.log('[LOG] data:', data)

		// WARNING!!! only call this when action is confirmed
		// pendingAction(data);
	}
}

export const clearAlert = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ALERT
		});
	};
}

