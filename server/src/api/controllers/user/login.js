const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../../config/custom');

module.exports = async (ctx, next) => {
  const { db } = ctx;
  const { name, password } = ctx.request.body;

  if (typeof name !== 'string' || typeof password !== 'string' || name.trim() === '' || password.trim() === '') {
    return (ctx.body = {
      success: false,
      message: 'Wrong arguments'
    });
  }

  const user = await db.collection('user').findOne({
    name
  });

  if (!user) {
    return (ctx.body = {
      success: false,
      message: 'Wrong name or password'
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return (ctx.body = {
      success: false,
      message: 'Wrong name or password'
    });
  }

  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      iat: now,
      exp: now + 7 * 24 * 3600
    },
    jwtSecret
  );

  ctx.cookies.set('token', token, {
    domain: '127.0.0.1',
    maxAge: 7 * 24 * 3600 * 1000
  });

  return (ctx.body = {
    success: true,
    message: 'Login success'
  });
};
