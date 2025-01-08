const express = require('express');
const router = express.Router();

const {message, getMessages} = require('../controllers/messagecontrollers');
const protectRoute = require('../middleware/protectRoute');

router.get ('/messages/:id',protectRoute,getMessages);
 router.post ('/send/:id',protectRoute,message);

 module.exports = router;