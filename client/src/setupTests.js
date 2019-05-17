const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });


/***
 *	Fixes "document.createRange is not a function" error:
 *	https://stackoverflow.com/a/51887574/4677401
 */
// if (global.document) {
//   document.createRange = () => ({
//     setStart: () => {},
//     setEnd: () => {},
//     commonAncestorContainer: {
//       nodeName: "BODY",
//       ownerDocument: document,
//     },
//   })
// }  