import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { shallow, mount } from 'enzyme';

describe('Button Component', () => {
	it('renders without crashing', () => {

		shallow(<Button />);
	});
});