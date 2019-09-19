const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
// const TokenGenerator = require('./utils/TokenGenerator');
// const tokenGenerator = new TokenGenerator(
// 	process.env.JWT_SECRET,
// 	process.env.JWT_SECRET,
// 	{ expiresIn: '5s'}
// );
const tokenGenerator = require('./utils/TokenGenerator');

const STRINGS = {
  user_registration_success: 'new user registered',
  user_email_conflict: 'Sorry, that email address is already in use'
};

// TODO: Create DB or momory store (Redis?)
let refreshTokens = {};

const generateToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
    audience: process.env.JWT_AUD,
    issuer: process.env.JWT_ISS,
    jwtid: uuidv4(),
    subject: String(user._id)
  });
};

const setUserInfo = user => {
  return {
    _id: user._id,
    email: user.email
  };
};

exports.registerNewUser = (req, res, next) => {
  // console.log('registerNewUser:', req.body)
  const { email, password } = req.body;
  // TODO: Validate registration data before writing to DB

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser)
      return res.status(422).json({ message: STRINGS.user_email_conflict });

    const user = new User({
      email: email,
      password: password
    });

    user.save((err, savedUser) => {
      if (err) return next(err);

      let userInfo = setUserInfo(savedUser);
      const token = generateToken(userInfo);
      const refreshToken = uuidv4();
      // TODO: Set refresh token in DB
      refreshTokens[refreshToken] = savedUser._id;
      console.log('\n*** refreshTokens:', refreshTokens);

      res.cookie('JWT', token, {
        httpOnly: true,
        secure: process.env.PRODUCTION
      });
      res.cookie('RT', refreshToken, {
        httpOnly: true,
        secure: process.env.PRODUCTION
      });

      res.json({
        message: STRINGS.user_registration_success,
        token,
        refreshToken,
        user: userInfo
      });
    });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const userInfo = setUserInfo(req.user);
  const token = generateToken(userInfo);
  const refreshToken = uuidv4();
  // TODO: Set refresh token in DB
  refreshTokens[refreshToken] = req.user._id;
  console.log('\n*** refreshTokens:', refreshTokens);

  // res.cookie('JWT', token, { httpOnly: true, secure: process.env.PRODUCTION });
  // res.cookie('RT', refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.PRODUCTION
  // });

  res.json({
    message: 'Login successfull',
    token,
    refreshToken,
    user: userInfo
  });
};

// TODO: create logout method that removes the users refresh token from token store
exports.logout = (req, res, next) => {
  delete refreshTokens[req.cookies.RT];
  res.status(200).json({ message: 'You are now signed out' });
};

exports.requireAuth = (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return err.name === 'TokenExpiredError'
        ? handleExpiredToken(req, res, next)
        : next(err);
    }
    // Token is valid, get user ID and attach it to the request object
    console.log('*** TOKEN IS VALID ***\n decoded:\n', decoded);
    req.userId = decoded._id;
    return next();
  });
};

const handleExpiredToken = (req, res, next) => {
  console.log('\n*** TOKEN EXPIRED ***');
  // const userId = req.userId;
  const decoded = jwt.decode(req.cookies.JWT);
  const userId = decoded._id;
  const refreshToken = req.cookies.RT;

  // Check refresh token store
  if (refreshToken in refreshTokens && refreshTokens[refreshToken] == userId) {
    console.log('\n*** VALID REFRESH ***');
    const token = generateToken({ _id: userId });

    delete refreshTokens[refreshToken];
    const newRefreshToken = uuidv4();
    refreshTokens[newRefreshToken] = userId;

    res.cookie('JWT', token, {
      httpOnly: true,
      secure: process.env.PRODUCTION
    });
    res.cookie('RT', newRefreshToken, {
      httpOnly: true,
      secure: process.env.PRODUCTION
    });
    req.userId = userId;
    return next();
  } else {
    console.log('\n*** NO VALID REFRESH TOKEN FOUND, NEW LOGIN REQUIRED ***');
    // TODO: Redirect to login?
    // 			 and/or:
    //			 delete refreshTokens[req.cookies.RT];
    res.status(401).json({ message: 'Sign-in required' });
  }
};

// TODO: Move to user controller
exports.getUserInfo = async (req, res, next) => {
  // const user = setUserInfo(req.user);
  // if (!user._id) return next(new Error('Coulld not set user info.'));
  // console.log('getUserInfo, req.userId:', req.userId)
  // const userId = req.get('userId');
  const userId = req.userId;

  console.log('*** getUserInfo, userId:', userId);
  let user;
  try {
    user = await User.findById(userId, 'email');
  } catch (err) {
    return next(err);
  }

  res.json({
    message: 'User info retrieved',
    user
  });
};

// TODO: Signout/unauth user
