const express = require('express');

module.exports = function(prisma) {

    const router = express.Router();


    router.get('/ledger', async (req, res) => {

        try {

            const voluntarios =
                await prisma.voluntario.findMany({
                    orderBy:{
                        id:"asc"
                    }
                });


            const auditoria = [];


            for (const voluntario of voluntarios) {


                const resultado =
                    await prisma.transacao.aggregate({

                        where:{
                            voluntarioId:
                            voluntario.id
                        },

                        _sum:{
                            horas:true
                        }

                    });


                const saldoCalculado =
                    resultado._sum.horas || 0;


                const divergencia =
                    voluntario.saldo -
                    saldoCalculado;


                auditoria.push({

                    voluntarioId:
                    voluntario.id,

                    numero:
                    voluntario.numero,

                    saldoCarteira:
                    voluntario.saldo,

                    saldoCalculado,

                    divergencia,

                    status:
                    divergencia === 0
                    ? "INTEGRIDADE_OK"
                    : "DIVERGENCIA_LEDGER"

                });

            }


            return res.json({

                auditoria_version:
                "v1.0.0",

                total:
                auditoria.length,

                registros:
                auditoria,

                timestamp:
                new Date().toISOString()

            });


        } catch(error) {


            console.error(
                "ERRO AUDITORIA LEDGER:",
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
