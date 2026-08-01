const router = require("express").Router();

module.exports = function(prisma) {

    router.get(
        "/overview",
        async (req, res) => {

            try {

                const [
                    voluntarios,
                    acoes,
                    execucoes,
                    beneficios,
                    entradas,
                    saidas
                ] = await Promise.all([

                    prisma.voluntario.count(),

                    prisma.acao.count(),

                    prisma.execucaoParticipacao.count(),

                    prisma.beneficio.count(),

                    prisma.transacao.aggregate({
                        where:{
                            horas:{
                                gt:0
                            }
                        },
                        _sum:{
                            horas:true
                        }
                    }),

                    prisma.transacao.aggregate({
                        where:{
                            horas:{
                                lt:0
                            }
                        },
                        _sum:{
                            horas:true
                        }
                    })

                ]);


                const emitido =
                    entradas._sum.horas || 0;


                const resgatado =
                    Math.abs(
                        saidas._sum.horas || 0
                    );


                return res.json({

                    version:
                        "v1.0.0",

                    status:
                        "operational",


                    operacional:{

                        participantes:
                            voluntarios,

                        acoes,

                        execucoes

                    },


                    social:{

                        beneficios,

                        horas_sociais:
                            emitido - resgatado

                    },


                    economia:{

                        emitido,

                        resgatado,

                        saldo:
                            emitido - resgatado

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
