describe('Auth view', () => {
	it('baseUrl shows Login page', () => {
		cy.visit('/')
		.injectAxe()
		.checkA11y();
	});

	it('"Sign in" button reveals the sign in form', () => {
		cy.get('[data-cy=signin-reveal]').click()
		.checkA11y();
	});

	it('"Register" button reveals the registration form', () => {
		cy.get('[data-cy=registration-reveal]').click()
		.checkA11y();
	});
})