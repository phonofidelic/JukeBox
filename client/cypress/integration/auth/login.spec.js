describe('Auth', () => {
	it('baseUrl shows Login page', () => {
		cy.visit('/')
	});
	it('"Sign in" button reveals the sign in form', () => {
		cy.get('[data-cy=signInReveal]').click();	
	});

	it('Clicks "Sign in" button with empty email and password fields', () => {
		cy.get('[data-cy=signInButton').click();
		// TODO: Assert "Required" messages
	});

	it('Enters an invalid email', () => {
		cy.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signInEmail]')
			.within(fieldDiv => {
				cy.get('input')
				.type('invaildEmail');
			});
			cy.get('[data-cy=signInPassword]')
			.within(fieldDiv => {
				cy.get('input')
				.type(userData.password);
			});
			cy.get('[data-cy=signInButton').click();
			// TODO: Assert email error message
		});
	});	

	it('Enters the wrong password', () => {
		cy.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signInEmail]')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type(userData.email)
			});
			cy.get('[data-cy=signInPassword]')
			.within(fieldDiv => {
				cy.get('input')
				.clear()
				.type('p@assw0rd')
			});
			cy.get('[data-cy=signInButton').click();
			// BUG #1: view state resets to default	
			// TODO: Assert 401 alert
			cy.get('button')
			.contains('Ok')
			.click();
		});
	});

	it('Signs in with valid email and password', () => {
		cy.clearLoginInputs();
		cy.get('[data-cy=signInReveal]').click(); // BUG #1 workaround
		cy.fixture('user')
		.then(userData => {
			cy.get('[data-cy=signInEmail]')
			.within(fieldDiv => {
				cy.get('input')
				.type(userData.email);
			});
			cy.get('[data-cy=signInPassword')
			.within(fieldDiv => {
				cy.get('input')
				.type(userData.password);
			});
			cy.get('[data-cy=signInButton]')
			.click();
			// TODO: Assert user is authenticated and directed to Home view
		});
	});
});
