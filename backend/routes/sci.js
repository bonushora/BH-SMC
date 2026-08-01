const router = require('express').Router();

module.exports = function(prisma) {

    router.get('/metrics', async (req, res) => {

        try {

            const [
                voluntarios,
                acoes,
                participacoes,
                execucoes,
                beneficios,
                horas
            ] = await Promise.all([

                prisma.voluntario.count(),

                prisma.acao.count(),

                prisma.participacao.count(),

                prisma.execucaoParticipacao.count(),

                prisma.beneficio.count(),

                prisma.transacao.aggregate({
                    _sum:{
                        horas:true
                    }
                })

            ]);


            return res.json({

                sci_version:
                    "v0.1.0",

                status:
                    "operational",

                indicadores:{

                    cidadaos_envolvidos:
                        voluntarios,

                    acoes_monitoradas:
                        acoes,

                    participacoes:
                        participacoes,

                    execucoes_validadas:
                        execucoes,

                    beneficios_gerados:
                        beneficios,

                    horas_sociais:
                        horas._sum.horas || 0

                },

                timestamp:
                    new Date().toISOString()

            });


        } catch(error){

            return res.status(500).json({

                error:
                    error.message

            });

        }

    });


    return router;

};
