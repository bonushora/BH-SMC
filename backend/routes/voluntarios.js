const router = require('express').Router();

const voluntariosController =
    require('../controllers/voluntariosController');


module.exports = function(prisma) {


    router.post(
        '/',
        voluntariosController(prisma)
    );


    return router;

};
