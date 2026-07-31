const router = require("express").Router();

const controllerFactory =
require("../controllers/transacoesController");

module.exports = function(prisma){

    const controller =
        controllerFactory(prisma);

    router.get(
        "/",
        controller.listar
    );

    router.post(
        "/",
        controller.criar
    );

    return router;

};
