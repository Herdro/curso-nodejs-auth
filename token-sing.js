const jwt = require('jsonwebtoken');

const secret = 'myCat';
const payLoad = {
  sub: 1,
  role: 'customer'
};

function singToken(payLoad, secret) {
  return jwt.sign(payLoad, secret);
}

const token = singToken(payLoad, secret);
console.log(token);
