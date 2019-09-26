const jwt = require('jsonwebtoken');

const VALID_USERNAME = 'test';
const VALID_EMAIL = 'test@example.com';

const DUMMY_SECRET = '$dummysecret$';

module.exports = (req, res, next) => {
  const { username, email } = req.body;

  if (username !== VALID_USERNAME && email !== VALID_EMAIL) {
    res.status(401);
    return res.json({
      success: false,
      message: 'Authentication failed!',
      code: 1
    });
  }

  const token = jwt.sign({ username }, DUMMY_SECRET, {
    expiresIn: '24h' // expires in 24 hours
  });

  res.status(200);
  return res.json({
    success: true,
    message: 'Authentication successful!',
    token
  });
};
