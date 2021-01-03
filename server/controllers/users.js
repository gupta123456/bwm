
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getUser = function(req, res) {
  const requestedUserId = req.params.id;
  const user = res.locals.user;

  if (requestedUserId === user.id) {
    User.findById(requestedUserId, function(err, foundUser) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json(foundUser);
    })

  } else {
    User.findById(requestedUserId)
      .select('-revenue -stripeCustomerId -password')
      .exec(function(err, foundUser) {
        if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json(foundUser);
      })
  }
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.sub, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }
}

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .sendApiError(
        { title: 'Missing Data', 
          detail: 'Email or password is missing!'});
  }

  User.findOne({email}, (error, foundUser) => {
    if (error) {
      return res.mongoError(error);
    }

    if (!foundUser) {
      return res
        .sendApiError(
          { title: 'Invalid Email', 
            detail: "User with provided email doesn't exists"});
    }

    if (foundUser.hasSamePassword(password)) {
      const token = jwt.sign({
        sub: foundUser.id,
        username: foundUser.username
      }, config.JWT_SECRET, { expiresIn: '2h'})
      return res.json(token);
    } else {
      return res
        .sendApiError(
          { title: 'Invalid Email', 
            detail: "User with provided email doesn't exists"});
    }
  })
}

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res
      .sendApiError(
        { title: 'Missing Data', 
          detail: 'Email or password is missing!'});
  }

  if (password !== passwordConfirmation) {
    return res
      .sendApiError(
        { title: 'Invalid password', 
          detail: 'Password is not maching confirmation password!'});
  }

  User.findOne({email}, (error, existingUser) => {
    if (error) {
      return res.mongoError(error);
    }

    if (existingUser) {
      return res
      .sendApiError(
        { title: 'Invalid Email', 
          detail: 'User with provided email already exists!'});
    }

    const user = new User({username, email, password});
    user.save((error) => {
      if (error) {
        return res.mongoError(error);
      }

      return res.json({status: 'registered'});
    })
  })
}


exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decodedToken = parseToken(token);
    if (!decodedToken) { return notAuthorized(res); }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if(error) {
        return res.mongoError(error);
      }

      if (foundUser) {
        res.locals.user = foundUser;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  try {
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
  } catch(error) {
    return null;
  }
}

function notAuthorized(res) {
  return res
      .status(401)
      .send({errors: 
        [{title: 'Not Authorized!', detail: 'You need to log in to get an access!'}]})
}