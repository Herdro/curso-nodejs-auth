const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  };

  signToken(user) {
    const payLoad = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payLoad, config.jwtSecret);
    return{
      user,
      token
    };
  };

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.google.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.recoveryEmail, // generated ethereal user
        pass: config.recoveryEmailPassword, // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return { message: 'Email sent' };
  }
};

module.exports = AuthService;
