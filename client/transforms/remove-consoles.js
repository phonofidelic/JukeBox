export default (fileInfo, api) => {
	const j = api.jscodeshift;
  const root = j(fileInfo.source);

  return j(fileInfo.source)
  .find(j.CallExpression, {
  	callee: {
  		type: 'MemberExpression',
  		object: { type: 'Identifier', name: 'console' },
  	}
  })
  .remove()
  .toSource();
};

// from client root:
// jscodeshift src -t transforms/remove-consoles.js -d -p 