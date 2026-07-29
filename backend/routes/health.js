const router = require('express').Router();

module.exports = function(prisma) {

    router.get(
        '/',
        async (req, res) => {

            try {

                await prisma.$queryRaw`SELECT 1`;

                res.json({
                    status: "ok",
                    service: "BH-SMC",
                    database: "connected",
                    timestamp: new Date().toISOString()
                });

            } catch (error) {

                res.status(503).json({
                    status: "error",
                    service: "BH-SMC",
                    database: "disconnected",
                    message: error.message
                });

            }

        }
    );

    return router;

};
