const router = require('express').Router();
const {login, register, loader} = require('../controllers/authcontroller')

router.post('/login', login)

router.post('/register', register)

router.get('/api/users', loader)

module.exports = router;