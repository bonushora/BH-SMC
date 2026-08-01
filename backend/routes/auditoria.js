const router = require("express").Router();

module.exports = function(prisma) {

    router.get(
        "/overview",
        async (req, res) => {

            try {

                const [
                    voluntarios,
                    acoes,
                    participacoes,
                    execucoes,
                    transacoes,
                    beneficios,
                    horas
                ] = await Promise.all([

                    prisma.voluntario.count(),

                    prisma.acao.count(),

                    prisma.participacao.count(),

                    prisma.execucaoParticipacao.count(),

                    prisma.transacao.count(),

                    prisma.beneficio.count(),

                    prisma.transacao.aggregate({
                        _sum:{
                            horas:true
                        }
                    })

                ]);


                const totalHoras =
                    horas._sum.horas || 0;


                return res.json({

                    auditoria_version:
                        "v1.0.0",

                    integridade:
                        "ok",

                    registros:{

                        voluntarios,

                        acoes,

                        participacoes,

                        execucoes,

                        transacoes,

                        beneficios

                    },

                    impacto:{

                        horas_sociais:
                            totalHoras

                    },

                    timestamp:
                        new Date().toISOString()

                });


            } catch(error) {

                return res.status(500).json({

                    error:
                        error.message

                });

            }

        }
    );


    return router;

};
