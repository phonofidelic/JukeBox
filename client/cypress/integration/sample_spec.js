describe('First sample test', () => {
	it('goes to the login page', () => {
		cy.visit('http://localhost:3000');
		cy.injectAxe();
		// cy.screenshot();
	});

	it('Has no detectable a11y violations on load', () => {
	  // Test the page at initial load
	  cy.checkA11y()
	})
	
	it('opens the sign in form', () => {
		cy.get('[data-cy=signInReveal]').click();	
		// cy.wait(300);
		// cy.screenshot();
	});
		
	it('opnes the registration form', () => {
		cy.get('[data-cy=registrationInReveal]').click();
		// cy.wait(300);
		// cy.screenshot();
	});
});