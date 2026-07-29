const router = require('express').Router();

const controllerFactory =
    require('../controllers/coordenadoresController');

module.exports = function (prisma) {

    const controller =
        controllerFactory(prisma);

    router.get(
        '/',
        controller.listar
    );

    router.post(
        '/',
        controller.criar
    );

    router.get(
        '/:id/acoes',
        controller.buscarAcoes
    );

    router.get(
        '/:id/dashboard',
        controller.dashboard
    );

    return router;

};
