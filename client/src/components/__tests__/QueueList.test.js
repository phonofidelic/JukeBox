import React from 'react';
// import ReactDOM from 'react-dom';
import QueueList from '../QueueList';
import { shallow, mount } from 'enzyme';

describe('QueueList', () => {
	let props;
	let mountedQueueList;
	const queueList = () => {
		if (!mountedQueueList) {
			mountedQueueList = mount(
				<QueueList {...props} />
			);
		}
		return mountedQueueList;
	}

	beforeEach(() => {
		props = {
			queue: []
		}

		mountedQueueList = undefined;
	});

	it('sould always render a ul', () => {
		const ul = queueList().find('ul');
		expect(ul.length).toBeGreaterThan(0);
	});
});