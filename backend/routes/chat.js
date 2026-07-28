const router = require('express').Router();

const chatController =
    require('../controllers/chatController');


module.exports = function(prisma) {


    router.post(
        '/sovereign',
        chatController(prisma)
    );


    return router;

};
