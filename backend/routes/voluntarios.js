const router = require('express').Router();

const voluntariosController =
    require('../controllers/voluntariosController');


module.exports = function(prisma) {

    const controller =
        voluntariosController(prisma);


    router.post(
        '/',
        controller.criar
    );


    router.get(
        '/dashboard',
        controller.listarDashboard
    );


    router.get(
        '/dashboard/:numero',
        controller.dashboard
    );


    return router;

};
