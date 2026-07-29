module.exports = function (prisma) {

    return {

        listar: async function (req, res) {

            try {

                const coordenadores =
                    await prisma.coordenador.findMany({

                        include: {
                            acoes: true
                        },

                        orderBy: {
                            id: "asc"
                        }

                    });

                res.json(coordenadores);

            } catch (error) {

                res.status(500).json({
                    error: error.message
                });

            }

        },


        criar: async function (req, res) {

            try {

                const {
                    nome,
                    telefone
                } = req.body;

                const coordenador =
                    await prisma.coordenador.create({

                        data: {
                            nome,
                            telefone
                        }

                    });

                res.json({

                    success: true,

                    coordenador

                });

            } catch (error) {

                res.status(500).json({
                    error: error.message
                });

            }

        },


        buscarAcoes: async function (req, res) {

            try {

                const id = Number(req.params.id);

                const coordenador =
                    await prisma.coordenador.findUnique({

                        where: {
                            id
                        },

                        include: {
                            acoes: true
                        }

                    });

                res.json(coordenador);

            } catch (error) {

                res.status(500).json({
                    error: error.message
                });

            }

        },


        dashboard: async function (req, res) {

            try {

                const id = Number(req.params.id);

                const coordenador =
                    await prisma.coordenador.findUnique({

                        where: {
                            id
                        },

                        include: {

                            acoes: {

                                include: {

                                    participacoes: {

                                        include: {

                                            execucao: true

                                        }

                                    }

                                }

                            }

                        }

                    });

                if (!coordenador) {

                    return res.status(404).json({

                        error: "Coordenador não encontrado."

                    });

                }

                let participantes = 0;
                let emExecucao = 0;
                let finalizadas = 0;
                let pendentes = 0;
                let bonusDistribuidos = 0;

                const acoes = coordenador.acoes.map((acao) => {

                    const totalParticipacoes = acao.participacoes.length;

                    participantes += totalParticipacoes;

                    let acaoExecucao = 0;
                    let acaoFinalizadas = 0;
                    let acaoPendentes = 0;

                    for (const participacao of acao.participacoes) {

                        if (!participacao.execucao) {

                            pendentes++;
                            acaoPendentes++;
                            continue;

                        }

                        switch (participacao.execucao.status) {

                            case "EM_EXECUCAO":

                                emExecucao++;
                                acaoExecucao++;

                                break;

                            case "FINALIZADA":

                                finalizadas++;
                                acaoFinalizadas++;

                                bonusDistribuidos += acao.valorBonusHora;

                                break;

                            default:

                                pendentes++;
                                acaoPendentes++;

                        }

                    }

                    return {

                        id: acao.id,

                        nome: acao.nome,

                        categoria: acao.categoria,

                        participantes: totalParticipacoes,

                        emExecucao: acaoExecucao,

                        finalizadas: acaoFinalizadas,

                        pendentes: acaoPendentes,

                        valorBonusHora: acao.valorBonusHora

                    };

                });

                return res.json({

                    coordenador: {

                        id: coordenador.id,

                        nome: coordenador.nome

                    },

                    resumo: {

                        acoes: coordenador.acoes.length,

                        participantes,

                        emExecucao,

                        finalizadas,

                        pendentes,

                        bonusDistribuidos

                    },

                    acoes

                });

            } catch (error) {

                res.status(500).json({

                    error: error.message

                });

            }

        }

    };

};
