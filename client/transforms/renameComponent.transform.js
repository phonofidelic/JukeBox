/*
	from client root:
	dryrun and print: jscodeshift src -t transforms/renameComponent.transform.js --oldVarName="<variable name>" --newVarName="<variable name>" -d -p
*/
export default (fileInfo, api, options) => {
	return api.jscodeshift(fileInfo.source)
		.findVariableDeclarators(options.oldVarName) 
		.renameTo(options.newVarName)
		.toSource();
}