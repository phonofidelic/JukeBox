const User = require('../models/user.model');
const Track = require('../models/track.model');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const utils = require('./utils');
// const TokenGenerator = require('./utils/TokenGenerator');
// const tokenGenerator = new TokenGenerator(
// 	JWT_SECRET,
// 	JWT_SECRET,
// 	{ expiresIn: '5s'}
// );
const { JWT_SECRET, JWT_EXP, JWT_AUD, JWT_ISS } = require('../../config/keys');

const STRINGS = {
  user_registration_success: 'new user registered',
  user_email_conflict: 'Sorry, that email address is already in use'
};

// TODO: Create DB or momory store (Redis?)
let refreshTokens = {};

const generateToken = (user, refreshToken) => {
  return jwt.sign({ ...user, rt: refreshToken }, JWT_SECRET, {
    expiresIn: JWT_EXP,
    audience: JWT_AUD,
    issuer: JWT_ISS,
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

      const refreshToken = uuidv4();
      // TODO: Set refresh token in DB
      refreshTokens[refreshToken] = savedUser._id;

      const token = generateToken(userInfo, refreshToken);

      console.log('\n*** refreshTokens:', refreshTokens);

      res.cookie('JWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
      // res.cookie('RT', refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production'
      // });

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
  const userInfo = setUserInfo(req.user);

  const refreshToken = uuidv4();
  // TODO: Set refresh token in DB
  refreshTokens[refreshToken] = req.user._id;

  const token = generateToken(userInfo, refreshToken);

  console.log('\n*** refreshTokens:', refreshTokens);

  res.cookie('JWT', token, {
    // httpOnly: true
    // secure: process.env.NODE_ENV === 'production'
  });
  // res.cookie('RT', refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production'
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
  // const { token } = req.headers;
  const token = req.cookies.JWT;
  console.log('====================================');
  console.log('token:', token);
  console.log('====================================');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
  // console.log('====================================');
  // console.log('decoded token:', decoded);
  // console.log('====================================');
  const userId = decoded._id;
  const refreshToken = decoded.rt;

  // Check refresh token store
  if (refreshToken in refreshTokens && refreshTokens[refreshToken] == userId) {
    console.log('\n*** VALID REFRESH ***');

    delete refreshTokens[refreshToken];
    const newRefreshToken = uuidv4();
    refreshTokens[newRefreshToken] = userId;

    const token = generateToken({ _id: userId }, newRefreshToken);

    res.cookie('JWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    // res.cookie('RT', newRefreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production'
    // });
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
    user = await User.findById(userId, 'email storageUsage');
  } catch (err) {
    return next(err);
  }

  console.log('====================================');
  console.log('user.storageUsage:', user.storageUsage);
  console.log('====================================');
  if (user.storageUsage === undefined || user.storageUsage < 1) {
    console.log('====================================');
    console.log('NO STORAGE USAGE DATA');
    console.log('====================================');
    let calculatedStorageUsage = 0;

    const tracks = await utils.loadTracks(Track, userId);

    tracks.forEach(track => {
      console.log('track size:', track.file.size);
      calculatedStorageUsage += track.file.size;
    });

    console.log('====================================');
    console.log('CALCULATED STORAGE USAGE:', calculatedStorageUsage);
    console.log('====================================');

    const userRes = await User.update(
      { _id: userId },
      {
        storageUsage: calculatedStorageUsage
      }
    );
    userRes.n;
    console.log('====================================');
    console.log('UPDATED USER WITH STORAGE DATA:', userRes.nModified);
    console.log('====================================');
  }

  res.json({
    message: 'User info retrieved',
    user
  });
};

// TODO: Signout/unauth user
