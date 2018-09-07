import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';

import NavMobile from '../NavMobile';
import { INITIAL_STATE } from '../../reducers/player.reducer';
// TODO: Create mock-history instead of importing actual history config?
import { history, THEME } from '../../config';
import { ConnectedRouter } from 'react-router-redux';

/***
 *	This tests NavMobile rendering in each of its routing states.
 *	It does not test the sign-out functionality which will probably
 *	be removed from this component to a Profile component in the 
 *	near future.
 */

describe('NavMobile', () => {
	let props;
	let mountedNavMobile;
	let muiRenderer;
	let mockStore;

	const navMobile = props => {
		if (!mountedNavMobile) {
			mountedNavMobile = mount(
				<NavMobile {...props} />
			);
		}
	};

	beforeEach(() => {
		props = {
			locationPathname: null,
			handleSignOut: jest.fn(),
			theme: THEME
		};

		mountedNavMobile = undefined;
		muiRenderer = createRender();
		mockStore = { dispatch: jest.fn() };
	});

	it('renders as expected with default path', () => {
		props.locationPathname = '/';

		/***
		 *	Wrap NavMobile in Router component to avoid errors.
		 *	Is this an anti-pattern? Test depends too much on external code? 
		 */
		const tree = renderer
		.create(
			<ConnectedRouter 
				store={mockStore} 
				history={history}
			>
				<NavMobile {...props} />
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
				<NavMobile {...props} />
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
				<NavMobile {...props} />
			</ConnectedRouter>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
