const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const getUser = require('../controllers/usercontroller');
const router = express.Router();

router.get('/getUsers',protectRoute,getUser)

module.exports = router;