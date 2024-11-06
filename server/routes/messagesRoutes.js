const { addMessage, getAllMessages } = require('../controllers/MessagesController');

const router = require('express').Router()


router.post('/addMessage',addMessage)
router.post('/getMsg',getAllMessages)



module.exports = router;