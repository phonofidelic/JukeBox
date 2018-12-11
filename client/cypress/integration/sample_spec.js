describe('First sample test', () => {
	it('goes to the login page', () => {
		cy.visit('http://localhost:3000');
		cy.get('[data-cy=signInReveal]').click();
		cy.get('[data-cy=registrationInReveal]').click();
	});
});