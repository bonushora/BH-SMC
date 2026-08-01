const router = require("express").Router();

module.exports = function (prisma) {

  router.get("/overview", async (req, res) => {

    try {

      const [
        voluntarios,
        acoes,
        beneficios,
        entradas,
        saidas
      ] = await Promise.all([

        prisma.voluntario.count(),

        prisma.acao.count(),

        prisma.beneficio.count(),

        prisma.transacao.aggregate({
          where: {
            horas: {
              gt: 0
            }
          },
          _sum: {
            horas: true
          }
        }),

        prisma.transacao.aggregate({
          where: {
            horas: {
              lt: 0
            }
          },
          _sum: {
            horas: true
          }
        })

      ]);

      const emitido = entradas._sum.horas || 0;
      const resgatado = Math.abs(saidas._sum.horas || 0);

      return res.json({

        participacao: {
          cidadaos: voluntarios,
          acoes
        },

        impacto: {
          beneficios
        },

        economia_bh: {
          emitido,
          resgatado,
          saldo: emitido - resgatado
        },

        status: "operational",

        timestamp: new Date().toISOString()

      });

    } catch (error) {

      return res.status(500).json({
        error: error.message
      });

    }

  });

  return router;

};
