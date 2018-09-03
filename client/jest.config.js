module.exports = {
  verbose: true,
  "setupTestFrameworkScriptFile": "./src/setupTests.js",
  testPathIgnorePatterns: [
		'/src/containers/',
		'/src/App.test.js',
		'/src/components/__tests__/LoginForm.test.js'
  ]
};