// // const { check } = require('express-validator');

// // exports.userRegisterValidator = [
// //   check('name').not().isEmpty().withMessage('Name is Required'),
// //   check('email').isEmpty().withMessage('Must be valid Email'),
// //   check('password')
// //     .isLength({ min: 6 })
// //     .withMessage('Password must be atleast 6 characters long'),
// //   check('city').not().isEmpty().withMessage('Enter Your City '),
// // ];
// const { check } = require('express-validator');

// exports.userRegisterValidator = [
//   check('username').not().isEmpty().withMessage('Name is required'),
//   check('email').isEmail().withMessage('Must be a valid email address'),
//   check('city').not().withMessage('City address must not be null'),
//   check('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
// ];

const { check } = require('express-validator');

exports.userRegisterValidator = [
  check('username').not().isEmpty().withMessage('Name is required'),
  check('city').not().isEmpty().withMessage('city is required'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
exports.userLoginValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
