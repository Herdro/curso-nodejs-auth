const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'myPassword';
  const hash = '$2b$10$9li3Mr/3p3e4WX9DUqOk1.trC3cztlYTvXPxUMf2RGP2sJAPbSF4u'
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
