module.exports = function(prisma) {

    const router = require('express').Router();

    router.get(
        '/',
        async (req, res) => {

            try {

                const beneficios =
                    await prisma.beneficio.findMany({
                        orderBy: {
                            id: 'asc'
                        }
                    });

                res.json({
                    total: beneficios.length,
                    beneficios
                });

            } catch (error) {

                console.error(
                    "Erro ao consultar benefícios:",
                    error
                );

                res.status(500).json({
                    error: "Erro interno ao consultar benefícios"
                });

            }

        }
    );

    return router;

};
