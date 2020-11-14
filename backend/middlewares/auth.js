const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Could not find Authorization header');
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error(err);
    error.status = 401;

    return next(error);
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.status = 401;
    return next(error);
  }

  req.userId = decodedToken.id;
  next();
};
