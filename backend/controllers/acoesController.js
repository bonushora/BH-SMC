module.exports = function (prisma) {

    return {

        listar: async function (req, res) {

            try {

                const acoes = await prisma.acao.findMany({

                    orderBy: {
                        id: 'asc'
                    }

                });

                return res.json(acoes);

            } catch (error) {

                return res.status(500).json({
                    error: error.message
                });

            }

        },


        criar: async function (req, res) {

            try {

                const {
                    nome,
                    categoria,
                    descricao,
                    valorBonusHora,
                    coordenadorId
                } = req.body;


                const acao = await prisma.acao.create({

                    data: {
                        nome,
                        categoria,
                        descricao,
                        valorBonusHora,
                        coordenadorId
                    }

                });


                return res.status(201).json({

                    success: true,
                    acao

                });

            } catch (error) {

                return res.status(500).json({
                    error: error.message
                });

            }

        }

    };

};
