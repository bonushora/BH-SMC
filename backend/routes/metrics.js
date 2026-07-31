
const express = require('express');

module.exports = function(prisma) {

    const router = express.Router();


    router.get('/metrics', async (req, res) => {

        try {

            const [

                voluntarios,
                coordenadores,
                acoes,
                participacoes,
                execucoes,
                beneficios,

                entradas,
                saidas

            ] = await Promise.all([

                prisma.voluntario.count(),

                prisma.coordenador.count(),

                prisma.acao.count(),

                prisma.participacao.count(),

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


            const horasEmitidas =
                entradas._sum.horas || 0;


            const horasResgatadas =
                Math.abs(
                    saidas._sum.horas || 0
                );


            return res.json({

                version:
                "v0.2.0-mvp",


                status:
                "operational",


                indicadores:{

                    voluntarios,

                    coordenadores,

                    acoes,

                    participacoes,

                    execucoes,

                    beneficios,

                    bonusHoraEmitido:
                    horasEmitidas,

                    bonusHoraResgatado:
                    horasResgatadas,

                    saldoCirculante:
                    horasEmitidas -
                    horasResgatadas

                },


                timestamp:
                new Date().toISOString()

            });


        } catch(error) {


            console.error(
                "ERRO BI:",
                error
            );


            return res.status(500).json({

                error:
                error.message

            });


        }

    });


    return router;

};
