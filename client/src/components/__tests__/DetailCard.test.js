import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';
import DetailCard from '../DetailCard';

const testArtistData = {
	name: 'Test',
	description: 'This is a test.'
};

const testAlbumData = {
	title: 'Test',
	description: 'This is a test.'
}

describe('DetailCard', () => {
	let props;
	let mountedDetailCard;
	let muiRenderer;

	const detailMessage = (props) => {
		if (!mountedDetailCard) {
			mountedDetailCard = mount(
				<DetailCard {...props} />
			);
		}
		return mountedDetailCard;
	};

	beforeEach(() => {
		props = {
			detailViewData: null,
			handleCloseDetailView: jest.fn()
		};
		mountedDetailCard = undefined;
		muiRenderer = createRender();
	});

	it('renders an empty div if no detailViewData is present', () => {
		const tree = renderer
			.create(<DetailCard {...props} />)
			.toJSON();
		const divs = detailMessage(props).find('div');

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
	it('renders a Dialog if detailViewData is present', () => {
		props.detailViewData = testArtistData;

		const tree = muiRenderer(<DetailCard {...props} />);
		const dialog = detailMessage(props).find('Dialog');

		expect(tree).toMatchSnapshot();
		expect(dialog).toHaveLength(1);
	});
});