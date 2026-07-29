const router = require('express').Router();

const acoesController =
    require('../controllers/acoesController');


module.exports = function (prisma) {

    const controller =
        acoesController(prisma);


    router.get(
        '/',
        controller.listar
    );


    router.post(
        '/',
        controller.criar
    );


    return router;

};
