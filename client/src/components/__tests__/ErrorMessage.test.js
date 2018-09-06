import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';
import ErrorMessage from '../ErrorMessage';

const INITIAL_STATE = {
	showError: false,
	data: null,
	title: null,
	status: null,
	message: null,
};

describe('ErrorMessage', () => {
	let props;
	let mountedErrorMessage;
	let muiRenderer;

	const errorMessage = props => {
		if (!mountedErrorMessage) {
			mountedErrorMessage = mount(
				<ErrorMessage {...props} />
			);
		}
		return mountedErrorMessage;
	};

	beforeEach(() => {
		props = {
			error: INITIAL_STATE,
			handleClearError: jest.fn()
		};
		mountedErrorMessage = undefined;
		muiRenderer = createRender();
	});

	it('renders an empty div if no error is present', () => {
		const tree = renderer
			.create(<ErrorMessage {...props} />)
			.toJSON();
		const divs = errorMessage(props).find('div');

		expect(tree).toMatchSnapshot();
		expect(divs).toHaveLength(1);
	});

	/***
	 *	Snapshot testing material-ui components needs createRender
	 *	for tesing rendered Dialog component:
	 *	https://material-ui.com/guides/testing/#createrender-options-render
	 *
	 *	This is needed because material-ui uses React portals to
	 *	render modals: 
	 *	https://reactjs.org/docs/portals.html
	 *	https://github.com/facebook/react/issues/11565
	 */
	it('renders a Dialog if an error is present', () => {
		props.error = {
			showError: true,
			title: 'Test Error',
			status: 418,
			message: 'This is a test.'
		};

		const tree = muiRenderer(<ErrorMessage {...props} />);
		const dialog = errorMessage(props).find('Dialog');
		const dialogTitle = errorMessage(props).find('DialogTitle');
		const dialogContent = errorMessage(props).find('DialogContent');
		const dialogActions = errorMessage(props).find('DialogActions');

		expect(tree).toMatchSnapshot();
		expect(dialog).toHaveLength(1);
		expect(dialogTitle).toHaveLength(1);
		expect(dialogContent).toHaveLength(1);
		expect(dialogActions).toHaveLength(1);
	});
});

