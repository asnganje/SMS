const router = require('express').Router();
const {login, register} = require('../controllers/authcontroller')

router.post('/login', login)

router.post('/register', register)

module.exports = router;