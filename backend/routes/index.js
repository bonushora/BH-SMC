const router = require('express').Router();

const metricsRoutes = require('./metrics');
const transacoesRoute = require('./transacoes');
const homologacaoRoute = require('./homologacao');
const voluntariosRoute = require('./voluntarios');
const chatRoute = require('./chat');
const acoesRoute = require('./acoes');
const participacoesRoute = require('./participacoes');
const execucoesRoute = require('./execucoes');
const coordenadoresRoute = require('./coordenadores');
const healthRoute = require('./health');
const ledgerRoute = require('./ledger');
const executiveRoute = require('./executive');
const sciRoutes = require('./sci');
const dashboardRoute = require('./dashboard');
const auditoriaRoute = require('./auditoria');

module.exports = function(prisma) {

    router.use(
        '/bi',
        metricsRoutes(prisma)
    );

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

    router.use(
        '/acoes',
        acoesRoute(prisma)
    );

    router.use(
        '/participacoes',
        participacoesRoute(prisma)
    );

    router.use(
        '/execucoes',
        execucoesRoute(prisma)
    );

    router.use(
        '/coordenadores',
        coordenadoresRoute(prisma)
    );

    router.use(
        '/health',
        healthRoute(prisma)
    );

    router.use(
        '/ledger',
        ledgerRoute(prisma)
    );

    router.use(
        '/sci',
        sciRoutes(prisma)
    );

    router.use(
        '/executive',
        executiveRoute(prisma)
    );

    router.use(
        '/dashboard',
        dashboardRoute(prisma)
    );

    router.use(
        '/auditoria',
        auditoriaRoute(prisma)
    );

    return router;

};
