import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';
import LibraryDesktop from '../LibraryDesktop';
import { INITIAL_STATE } from '../../reducers/library.reducer';
import { THEME } from '../../config';

describe('LibraryDesktop', () => {
	let props;
	let mountedLibraryDesktop;
	let muiRenderer;

	const libraryDesktop = props => {
		if (!mountedLibraryDesktop) {
			mountedLibraryDesktop = mount(
				<LibraryDesktop {...props} />
			);
		}
		return mountedLibraryDesktop;
	};

	beforeEach(() => {
		// console.log('### INITIAL_STATE:', INITIAL_STATE)
		props = {
			library: INITIAL_STATE,
			order: 'desc',
			orderBy: 'title',
			userAgentIsMobile: false,
			handleSelectTrack: jest.fn(),
			handleOptionsClick: jest.fn(),
			handleOptionsClose: jest.fn(),
			handleMenuOptionClickEdit: jest.fn(),
			handleMenuOptionClickDelete: jest.fn(),
			handleCloseDetailView: jest.fn(),
			theme: THEME,
		};

		mountedLibraryDesktop = undefined;
		muiRenderer = createRender();
	});

	it('empty library renderes correctly', () => {
		const tree = muiRenderer(<LibraryDesktop {...props} />);
		expect(tree).toMatchSnapshot();
	});

	// it('renders a tracklist if library has tracks', () => {
	// 	props.library = [
	// 		{
				
	// 		}
	// 	]
	// })
});
