module.exports = function (prisma) {

    return {

        criar: async function (req, res) {

            try {

                const { numero } = req.body;

                if (!numero) {

                    return res.status(400).json({
                        error: "Número obrigatório."
                    });

                }

                const voluntario =
                    await prisma.voluntario.create({

                        data: {

                            numero,

                            saldo: 10

                        }

                    });

                return res.json({

                    success: true,

                    voluntario,

                    mensagem:
                        "Voluntário cadastrado com 10 horas iniciais!"

                });

            } catch (error) {

                return res.status(400).json({

                    error:
                        "Número já cadastrado no sistema."

                });

            }

        },


        dashboard: async function (req, res) {

            try {

                const numero = req.params.numero;

                const voluntario =
                    await prisma.voluntario.findUnique({

                        where: {
                            numero
                        },

                        include: {

                            participacoes: {

                                include: {

                                    acao: true,
                                    execucao: true

                                }

                            },

                            transacoes: true

                        }

                    });


                if (!voluntario) {

                    return res.status(404).json({

                        error:
                            "Voluntário não encontrado."

                    });

                }


                const participacoesAprovadas =
                    voluntario.participacoes.filter(
                        p => p.status === "APROVADO"
                    );


                const categorias =
                    [
                        ...new Set(
                            participacoesAprovadas.map(
                                p => p.acao.categoria
                            )
                        )
                    ];


                const totalCreditos =
                    voluntario.transacoes
                        .filter(t => t.horas > 0)
                        .reduce(
                            (total, t) =>
                                total + t.horas,
                            0
                        );


                return res.json({

                    voluntario: {

                        id: voluntario.id,
                        numero: voluntario.numero,
                        saldo: voluntario.saldo

                    },

                    carteira: {

                        saldoAtual: voluntario.saldo,
                        totalCreditos,
                        totalTransacoes:
                            voluntario.transacoes.length

                    },

                    impacto: {

                        acoesParticipadas:
                            participacoesAprovadas.length,

                        categorias

                    },

                    resumo: {

                        participacoes:
                            voluntario.participacoes.length,

                        transacoes:
                            voluntario.transacoes.length

                    },

                    historico: {

                        participacoes:
                            voluntario.participacoes,

                        transacoes:
                            voluntario.transacoes

                    }

                });


            } catch (error) {

                return res.status(500).json({

                    error: error.message

                });

            }

        },


        listarDashboard: async function (req, res) {

            try {

                const voluntarios =
                    await prisma.voluntario.findMany({

                        include: {

                            participacoes: {

                                include: {

                                    acao: true

                                }

                            },

                            transacoes: true

                        }

                    });


                const resultado =
                    voluntarios.map(voluntario => {


                        const aprovadas =
                            voluntario.participacoes.filter(
                                p => p.status === "APROVADO"
                            );


                        return {

                            id: voluntario.id,

                            numero:
                                voluntario.numero,

                            saldo:
                                voluntario.saldo,

                            acoesAprovadas:
                                aprovadas.length,

                            transacoes:
                                voluntario.transacoes.length,

                            categorias:
                                [
                                    ...new Set(
                                        aprovadas.map(
                                            p => p.acao.categoria
                                        )
                                    )
                                ]

                        };

                    });


                return res.json(resultado);


            } catch (error) {

                return res.status(500).json({

                    error: error.message

                });

            }

        }

    };

};
