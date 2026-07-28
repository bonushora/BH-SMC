module.exports = function (prisma) {

    return {

        listar: async function (req, res) {

            try {

                const participacoes =
                    await prisma.participacao.findMany({

                        include: {
                            voluntario: true,
                            acao: true
                        },

                        orderBy: {
                            id: 'asc'
                        }

                    });


                return res.json(participacoes);


            } catch (error) {

                return res.status(500).json({
                    error: error.message
                });

            }

        },


        criar: async function (req, res) {

            try {

                const {
                    voluntarioId,
                    acaoId
                } = req.body;


                const participacao =
                    await prisma.participacao.create({

                        data: {

                            voluntarioId,
                            acaoId

                        }

                    });


                return res.status(201).json({

                    success: true,
                    participacao

                });


            } catch (error) {

                return res.status(500).json({
                    error: error.message
                });

            }

        }

    };

};
