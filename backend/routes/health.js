const router = require('express').Router();

module.exports = function(prisma) {

    router.get('/', async (req, res) => {

        try {

            await prisma.$queryRaw`SELECT 1`;

            const [

                voluntarios,
                coordenadores,
                acoes,
                participacoes,
                execucoes,
                transacoes,
                beneficios

            ] = await Promise.all([

                prisma.voluntario.count(),
                prisma.coordenador.count(),
                prisma.acao.count(),
                prisma.participacao.count(),
                prisma.execucaoParticipacao.count(),
                prisma.transacao.count(),
                prisma.beneficio.count()

            ]);

            return res.json({

                status: "ok",

                service: "BH-SMC",

                version: "v0.2.0-mvp",

                database: "connected",

                metrics: {

                    voluntarios,
                    coordenadores,
                    acoes,
                    participacoes,
                    execucoes,
                    transacoes,
                    beneficios

                },

                timestamp:
                    new Date().toISOString()

            });

        } catch(error) {

            return res.status(503).json({

                status: "error",

                service: "BH-SMC",

                database: "disconnected",

                message: error.message

            });

        }

    });

    return router;

};
