describe('First sample test', () => {
	it('goes to the login page', () => {
		cy.visit('http://localhost:3000');
		cy.screenshot();
	});
	
	it('opens the sign in form', () => {
		cy.get('[data-cy=signInReveal]').click();	
		cy.wait(300);
		cy.screenshot();
	});
		
	it('opnes the registration form', () => {
		cy.get('[data-cy=registrationInReveal]').click();
		cy.wait(300);
		cy.screenshot();
	});
});