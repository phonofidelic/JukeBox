describe('Login', () => {
	before(() => {
		cy.fixture('user').then(userData => {
			cy.task('db:removeTestUser', userData.email)
			cy.request('POST', '/auth/register', {
						email: userData.email, 
						password: userData.password
				})
				.then(response => {
					console.log('cy register response:', response)
				})
				.visit('/')
				.injectAxe()
				.get('[data-cy=registration-reveal]')
				.click();
		});
	});
		
	it('Clicks "Sign in" button with empty email and password fields', () => {
		cy.get('[data-cy=signin-button').click();
		// TODO: Assert "Required" messages
	});

	it('Enters an invalid email', () => {
		cy.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signin-email]')
			.within(fieldDiv => {
				cy.get('input')
				.type('invaildEmail');
			})
			.get('[data-cy=signin-password]')
			.within(fieldDiv => {
				cy.get('input')
				.type(userData.password);
			})
			.get('[data-cy=signin-button').click()
			// TODO: Assert email error message
			// .checkA11y(); // BUG(?): throws color contrast issue, triggered by MUI component?
		});
	});	

	it('Enters the wrong password', () => {
		cy.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signin-email]')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type(userData.email);
			})
			.get('[data-cy=signin-password]')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type('p@assw0rd');
			})
			.get('[data-cy=signin-button').click()
			// BUG #1: view state resets to default	
			// TODO: Assert 401 alert
			.checkA11y()
			.get('button')
			.contains('Ok')
			.click();
		});
	});

	it('Signs in with valid email and password', () => {
		cy.get('[data-cy=signin-reveal]').click() // BUG #1 workaround
		.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signin-email]')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type(userData.email);
			})
			.get('[data-cy=signin-password')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type(userData.password);
			})
			.get('[data-cy=signin-button]')
			.click()
			// TODO: Assert user is authenticated and directed to Home view
		});
	});
});
