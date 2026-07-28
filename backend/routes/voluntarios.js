const router = require('express').Router();

module.exports = function(prisma) {

    router.post('/', async (req, res) => {

        try {

            const { numero } = req.body;

            if (!numero) {
                return res.status(400).json({
                    error: "Número obrigatório."
                });
            }

            const voluntario = await prisma.voluntario.create({
                data: {
                    numero,
                    saldo: 10
                }
            });

            return res.json({
                success: true,
                voluntario,
                mensagem: "Voluntário cadastrado com 10 horas iniciais!"
            });

        } catch (error) {

            return res.status(400).json({
                error: "Número já cadastrado no sistema."
            });

        }

    });

    return router;
};
