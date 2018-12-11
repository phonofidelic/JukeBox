describe('First sample test', () => {
	it('goes to the login page', () => {
		cy.visit('http://localhost:3000')
		cy.contains('Sign in').click()
	})
})