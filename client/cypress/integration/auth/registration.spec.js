describe('Registration', () => {
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

	it('Enters invalid email', () => {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.type('invalid');
			// TODO: Assert error message
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.type('p@ssw0rd');
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.type('p@ssw0rd{enter}')
			.checkA11y();
		});
	});

	it('Enters invalid password', () => {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('test@example.com');
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

	it('Enters mismatching passwords', () => {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('test@example.com');
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rd');
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rdX{enter}');
		})
		.checkA11y()
		// TODO: Assert error message
		.get('[data-cy=error-dismiss-button]')
		.click();
	});

	it('Enters existing users email', () => {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('test@test.test');
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rd');
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rd{enter}');
		})
		.checkA11y()
		// TODO: Assert error message
		.get('[data-cy=error-dismiss-button]')
		.click();
	});

	it('Registers a new user when valid data is entered', () => {
		cy.get('[data-cy=registration-email]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('test@example.com');
		})
		.get('[data-cy=registration-password]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rd');
		})
		.get('[data-cy=registration-password-confirm]')
		.within(fieldDiv => {
			cy.get('input')
			.clear()
			.type('p@ssw0rd{enter}');
		});
	});
});