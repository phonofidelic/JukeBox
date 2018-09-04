import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// const localstorage = new LocalStorageMock;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;

// describe('App', () => {
// 	// it('renders without crashing', () => {
// 	//   const div = document.createElement('div');
// 	//   ReactDOM.render(<App />, div);
// 	//   // ReactDOM.unmountComponentAtNode(div);
// 	// });
// 	// it('renders without crashing', () => {
// 	//   const div = document.createElement('div');
// 	//   ReactDOM.render(<App />, div);
// 	// });
	
// 	// let localStorage;

// 	// beforeEach(() => {
// 	// 	localStorage = new LocalStorageMock;
// 	// })

// 	it('renderes correctly', () => {
// 		const tree = renderer
// 			.create(<App />)
// 			.toJSON();

// 		expect(tree).toMatchSnapshot();
// 	});

	// it('renders without crashing', () => {
	// 	const div = document.createElement('div');
	// 	shallow(<App/>);
	// 	ReactDOM.render(<App />, div);
	// })
// });

describe('App Container', () => {
	xit('renders without crashing', () => {
		const div = document.createElement('div');
		// const wrapper = shallow(<App/>);
		// expect(wrapper.find(div)).toBeGreaterThan(0)
		ReactDOM.render(<App />, div);
	})
})
