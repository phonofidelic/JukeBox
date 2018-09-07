import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';

import NavDesktop from '../NavDesktop';
import { INITIAL_STATE } from '../../reducers/player.reducer';
// TODO: Create mock-history instead of importing actual history config?
import { history, THEME } from '../../config';
import { ConnectedRouter } from 'react-router-redux';

/***
 *	This tests NavDesktop rendering in each of its routing states.
 *	It does not test the sign-out functionality which will probably
 *	be removed from this component to a Profile component in the 
 *	near future.
 */

describe('NavDesktop', () => {
	let props;
	let mountedNavDesktop;
	let muiRenderer;
	let mockStore;

	const navDesktop = props => {
		if (!mountedNavDesktop) {
			mountedNavDesktop = mount(
				<NavDesktop {...props} />
			);
		}
	};

	beforeEach(() => {
		props = {
			locationPathname: null,
			handleSignOut: jest.fn(),
			theme: THEME
		};

		mountedNavDesktop = undefined;
		muiRenderer = createRender();
		mockStore = { dispatch: jest.fn() };
	});

	it('renders as expected with default path', () => {
		props.locationPathname = '/';

		/***
		 *	Wrap NavDesktop in Router component to avoid errors.
		 *	Is this an anti-pattern? Test depends too much on external code? 
		 */
		const tree = renderer
		.create(
			<ConnectedRouter 
				store={mockStore} 
				history={history}
			>
				<NavDesktop {...props} />
			</ConnectedRouter>
		).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('renders as expected with "/library" path', () => {
		props.locationPathname = '/library';

		const tree = renderer.create(
			<ConnectedRouter
				store={mockStore}
				history={history}
			>
				<NavDesktop {...props} />
			</ConnectedRouter>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('renders as expected with "/uploader" path', () => {
		props.locationPathname = '/uploader';

		const tree = renderer.create(
			<ConnectedRouter
				store={mockStore}
				history={history}
			>
				<NavDesktop {...props} />
			</ConnectedRouter>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
