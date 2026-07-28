const router = require('express').Router();

const transacoesController =
    require('../controllers/transacoesController');


module.exports = function(prisma) {


    router.post(
        '/',
        transacoesController(prisma)
    );


    return router;

};
