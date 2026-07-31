const router = require('express').Router();


const ledgerController =
    require('../controllers/ledgerController');


module.exports = function(prisma){


    const controller =
        ledgerController(prisma);


    router.get(
        '/',
        controller.listar
    );


    return router;

};

