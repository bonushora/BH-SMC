const router = require('express').Router();

const metricsRoutes = require('./metrics');
const transacoesRoute = require('./transacoes');
const homologacaoRoute = require('./homologacao');
const voluntariosRoute = require('./voluntarios');
const chatRoute = require('./chat');


module.exports = function(prisma) {

    router.use('/bi', metricsRoutes(prisma));

    router.use(
        '/transacoes',
        transacoesRoute(prisma)
    );

    router.use(
        '/homologacao',
        homologacaoRoute(prisma)
    );

    router.use(
        '/voluntarios',
        voluntariosRoute(prisma)
    );

    router.use(
        '/chat',
        chatRoute(prisma)
    );


    return router;
};
