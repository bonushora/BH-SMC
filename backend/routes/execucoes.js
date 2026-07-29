const router = require('express').Router();

const controllerFactory =
require('../controllers/execucoesController');


module.exports = function(prisma){


    const controller =
        controllerFactory(prisma);



    router.post(
        '/checkin',
        controller.checkin
    );


    router.patch(
        '/:id/checkout',
        controller.checkout
    );


    router.patch(
        '/:id/aprovar',
        controller.aprovar
    );


    return router;

};
