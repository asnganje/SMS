const router = require('express').Router();
const {login, register, loader, parent, loader1} = require('../controllers/authcontroller')

router.post('/login', login)

router.post('/register', register)

router.post('/parent', parent)

router.get('/api/users', loader)
router.get('/pareents', loader1)

module.exports = router;