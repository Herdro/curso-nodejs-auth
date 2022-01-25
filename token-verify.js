const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0MzEzOTUxOH0.n_FAPmkiUULbL0qyG4pZ_wSwDHyD7H0iyHBqT0M5vNE';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payLoad = verifyToken(token, secret);
console.log(payLoad);
