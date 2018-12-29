describe('Registration', () => {
	beforeEach(() => {
		cy.fixture('user').as('userData');
	});

	before(() => {
		cy.task('db:removeTestUser', 'test@example.com')
		.visit('/')
		.injectAxe()
		.get('[data-cy=registration-reveal]')
		.click();
	});

	it('Clicks "Register" button with all fields empty', () => {
		cy.get('[data-cy=registration-button]')
		.click()
		// .checkA11y();
	});

	it('Enters invalid email', function() {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.type('invalid');
			// TODO: Assert error message
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.type(this.userData.password);
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.type(`${this.userData.password}{enter}`)
			.checkA11y();
		});
	});

	it('Enters invalid password', function() {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.email);
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('a');
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('a{enter}')
		})
		.checkA11y()
		// TODO: Assert error message
		.get('[data-cy=error-dismiss-button]')
		.click();
	});

	it('Enters mismatching passwords', function() {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.email);
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.password);
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(`${this.userData.password}X{enter}`);
		})
		.checkA11y()
		// TODO: Assert error message
		.get('[data-cy=error-dismiss-button]')
		.click();
	});

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

	it('Enters existing users email', function() {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.email);
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.password);
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(`${this.userData.password}{enter}`);
		})
		.checkA11y()
		// TODO: Assert error message
		.get('[data-cy=error-dismiss-button]')
		.click();
	});

	it('Registers a new user when valid data is entered', function() {
		cy.task('db:removeTestUser', this.userData.email)
		.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.email);
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(this.userData.password);
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type(`${this.userData.password}{enter}`);
		});
	});
});