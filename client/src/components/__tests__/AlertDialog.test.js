import React from 'react';
import ReactDOM from 'react-dom';
import AlertDialog from '../AlertDialog';
import { shallow, mount } from 'enzyme';

describe('AlertDialog', () => {
	let props;
	let mountedAlertDialog;
	const alertDialog = () => {
		if (!mountedAlertDialog) {
			mountedAlertDialog = mount(
				<AlertDialog {...props} />
			);
		}
		return mountedAlertDialog;
	}

	beforeEach(() => {
		props = {
			triggerButtonText: undefined,
      headerText: undefined,
      bodyText: undefined,
      actionCancelButtonText: undefined,
      actionConfirmButtonText: undefined,
      handleActionConfirm: undefined
		};
		mountedAlertDialog = undefined;
	});

	it('should always render a div', () => {
		const divs = alertDialog().find('div');
		expect(divs.length).toBeGreaterThan(0);
	});
});