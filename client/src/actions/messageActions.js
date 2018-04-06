import { CLEAR_MESSAGE } from '../actiontypes';

export const clearMessage = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_MESSAGE
		});
	};
}