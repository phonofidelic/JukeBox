
import React from 'react';
// import ReactDOM from 'react-dom';
// import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LoginForm } from '../LoginForm'; 

/***
 *	Solution for snapshot testing decorated redux-form:
 *	https://github.com/erikras/redux-form/issues/849#issuecomment-255412223
 */

describe('LoginForm', () => {
	let props = {
		auth: {loginErr: false},
		handleLogin: jest.fn(),
		handleSubmit: jest.fn()
	}
	
	const fakeStore = createStore(() => ({}));
	const DecoratedForm = reduxForm({ form: 'testForm' })(LoginForm);

	it('renders correctly', () => {
	  const tree = renderer
	    .create(<Provider store={fakeStore}><DecoratedForm {...props} /></Provider>)
	    .toJSON();

	  expect(tree).toMatchSnapshot();
	});
});

// describe('LoginForm', () => {
// 	let props;
// 	let mountedLoginForm;

// 	const loginForm = () => {
// 		if (!mountedLoginForm) {
// 			mountedLoginForm = mount(
// 				<LoginForm {...props} />
// 			);
// 		}

// 		return mountedLoginForm;
// 	}

// 	beforeEach(() => {
// 		props = {
// 			auth: undefined,
// 			handleLogin: undefined,
// 			handleSubmit: jest.fn()
// 		}
// 	});

// 	mountedLoginForm = undefined;

// 	it('always renders a form', () => {
// 		const forms = loginForm().find('form');
// 		expect(forms.length).toBeGreaterThan(0);
// 	});
// });


