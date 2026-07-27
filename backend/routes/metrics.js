const express = require('express');

function createMetricsRouter(prisma) {
    const router = express.Router();

    router.get('/metrics', async (req, res) => {
        try {
            const totalVoluntarios = await prisma.voluntario.count();
            const transacoes = await prisma.transacao.aggregate({
                _sum: { horas: true }
            });

            const totalHoras = transacoes._sum.horas || 0;

            res.json({
                market_potential: "SECIS / Salvador Pilot",
                total_bonus_hours: totalHoras,
                active_volunteers: totalVoluntarios,
                mechanical_lock_status: "ARMED"
            });

        } catch (error) {
            console.error("ERRO DETALHADO:", error);
            res.status(500).json({
                error: "Erro ao buscar métricas.",
                details: error.message
            });
        }
    });

    return router;
}

module.exports = createMetricsRouter;
