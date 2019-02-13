/** From: https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
 * Example to refresh tokens using https://github.com/auth0/node-jsonwebtoken
 * It was requested to be introduced at as part of the jsonwebtoken library,
 * since we feel it does not add too much value but it will add code to mantain
 * we won't include it.
 *
 * I create this gist just to help those who want to auto-refresh JWTs.
 */

const jwt = require('jsonwebtoken');

function TokenGenerator (secretOrPrivateKey, secretOrPublicKey, options) {
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.secretOrPublicKey = secretOrPublicKey;
  this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function(payload, signOptions) {
  console.log('*** payload:', payload)
  const jwtSignOptions = Object.assign({}, signOptions, this.options);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
}

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function(token, refreshOptions) {
  const payload = jwt.verify(token, this.secretOrPublicKey /* users' password? */, refreshOptions.verify);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
  const jwtSignOptions = Object.assign({ }, this.options, { jwtid: refreshOptions.jwtid });
  console.log('*** token refresh, payload:', payload);
  console.log('\n*** token refresh, jwtSignOptions:', jwtSignOptions);
  // The first signing converted all needed options into claims, they are already in the payload
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
}

// module.exports = TokenGenerator;
module.exports = new TokenGenerator(
  process.env.JWT_SECRET, 
  process.env.JWT_SECRET,
  { expiresIn: '5s'}
);


// // Example:
// const uuidv4 = require('uuid/v4');

// const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '2m', notBefore: '2s' })
// token = tokenGenerator.sign({ myclaim: 'something' }, { audience: process.env.AUD, issuer: process.env.ISS, jwtid: uuidv4(), subject: 'user' })
// setTimeout(function () {
//   token2 = tokenGenerator.refresh(token, { verify: { audience: process.env.AUD, issuer: process.env.ISS }, jwtid: uuidv4() })
//   console.log(jwt.decode(token, { complete: true }))
//   console.log(jwt.decode(token2, { complete: true }))
// }, 3000);