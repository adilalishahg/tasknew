const express = require('express');
const router = express.Router();

// import validators
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');

// import from controllers
const { register, login, all, update, del, logout } = require('../controllers/auth');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/login', userLoginValidator, runValidation, login);
router.get('/all', all);
router.delete('/delete/:id', del);

router.get('/:id', update);
router.put('/:id', update);
router.delete('/logout', logout);

module.exports = router;
