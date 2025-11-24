const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  // Create user instance just to use hashing method
  const user = new userModel({
    fullname,
    email,
    password
  });

  // Hash password using schema method
  user.password = await user.hashPassword(password);
  
  await user.save();

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
//   console.log(req.body);
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};
