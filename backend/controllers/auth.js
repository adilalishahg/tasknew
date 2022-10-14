const User = require('../models/users');
const shortId = require('shortid');
const jwt = require("jsonwebtoken")
exports.register = (req, res) => {
  const { username, email, password, city } = req.body;
  // console.log(username, email, password, city);

  // // check if user exists in our db
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(401).json({
        error: 'Email is taken1',
      });
    }
    const name = shortId.generate();
    const newUsers = new User({ name, username, email, city, password });

    console.log(newUsers);
    // return newUsers;
    newUsers.save((err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'error saving in db',
        });
      }
      return res.json({
        message: 'Registration succeeded ',
      });
    });
    //   // generate token with user name email and password
    //   // const token = jwt.sign(
    //   //   { username, email, password, city },
    //   //   process.env.JWT_ACCOUNT_ACTIVATION,
    //   //   {
    //   //     expiresIn: '10m',
    //   //   }
    //   // );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not exist with such email.Please Register',
      });
    }
    // console.table(user);
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and Password not match',
      });
    }
    const { _id, username, email } = user;
    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '30s',
      }
    );
    console.log(token)
    return res.json({
      token,
      user: { _id, username, email },
    });
  });
  const sessUser = { id: user.id, name: user.name, email: user.email };
  req.session.user = sessUser; // Auto saves session data in mongo store
};
exports.all = (req, res) => {
  const all = User.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories could not load',
      });
    }
    res.json(data);
  });
};
exports.del = (req, res) => {
  const { id } = req.params;
  const all = User.deleteOne({ _id: id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories could not delete',
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { username, email, password, city } = req.body;
  const all = User.findOneAndUpdate(
    { id },
    { username, city, email, password },
    { new: true }
  ).exec((err, updated) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories could not find to update',
      });
    }
    res.json(updated);
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
};

