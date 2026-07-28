const router = require('express').Router();

const participacoesController =
    require('../controllers/participacoesController');


module.exports = function (prisma) {

    const controller =
        participacoesController(prisma);


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
