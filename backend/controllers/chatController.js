const chatCommands =
    require('../services/chat/chatCommands');

const chatResponse =
    require('../services/chat/chatResponse');

const homologacaoService =
    require('../services/homologacaoService');

const chatSession =
    require('../services/chat/chatSession');


module.exports = function(prisma) {

    return async function(req, res) {

        const identificador =
            req.body.identificador ||
            req.body.whatsapp;

        const canal =
            req.body.canal ||
            "whatsapp";

        try {

            if (!identificador) {

                return res.status(400).json({

                    error:
                    "Identificador do usuário obrigatório."

                });

            }


            const mensagem =
                req.body.mensagem || "";


            const sessao =
                chatSession.get(identificador);


            console.log(
                "[CHAT SESSION]",
                identificador,
                sessao
            );


            if (
                sessao &&
                sessao.estado === "AGUARDANDO_TIPO_BENEFICIO"
            ) {

                const resultado =
                    await homologacaoService.processResgate(
                        prisma,
                        {
                            whatsapp: identificador,
                            tipoBeneficio:
                                mensagem.trim().toUpperCase()
                        }
                    );


                chatSession.clear(identificador);


                return res.json({

                    canal,

                    ...resultado

                });

            }


            const comando =
                chatCommands.interpretar(
                    mensagem
                );


            const comandosPermitidos = [

                "MENU_PRINCIPAL",
                "CONSULTAR_SALDO",
                "CONSULTAR_DASHBOARD",
                "CONSULTAR_ACOES",
                "CONSULTAR_BENEFICIOS",
                "CONSULTAR_HISTORICO",
                "RESGATAR_BENEFICIO"

            ];


            if (
                !comandosPermitidos.includes(comando)
            ) {

                return res.json({

                    canal,

                    response:
                    "Comando não reconhecido.",

                    comando

                });

            }


            if (
                comando === "MENU_PRINCIPAL"
            ) {

                return res.json({

                    canal,

                    ...chatResponse.menu()

                });

            }


            const voluntario =
                await prisma.voluntario.findUnique({

                    where:{

                        numero:
                        identificador

                    }

                });


            if (!voluntario) {

                return res.json({

                    canal,

                    response:
                    "Bem-vindo ao Ledger SECIS! Você ainda não está cadastrado."

                });

            }


            if (
                comando === "CONSULTAR_SALDO"
            ) {

                return res.json({

                    canal,

                    usuario:{
                        numero:
                        voluntario.numero
                    },

                    ...chatResponse.saldo(voluntario)

                });

            }


            if (
                comando === "CONSULTAR_DASHBOARD"
            ) {

                const participacoes =
                    await prisma.participacao.count({

                        where:{
                            voluntarioId:
                            voluntario.id
                        }

                    });


                const transacoes =
                    await prisma.transacao.count({

                        where:{
                            voluntarioId:
                            voluntario.id
                        }

                    });


                return res.json({

                    canal,

                    usuario:{
                        numero:
                        voluntario.numero
                    },

                    ...chatResponse.dashboard({

                        saldoAtual:
                        voluntario.saldo,

                        participacoes,

                        transacoes

                    })

                });

            }


            if (
                comando === "CONSULTAR_ACOES"
            ) {

                const lista =
                    await prisma.participacao.findMany({

                        where:{
                            voluntarioId:
                            voluntario.id
                        },

                        include:{
                            acao:true
                        }

                    });


                return res.json({

                    canal,

                    ...chatResponse.acoes(lista)

                });

            }


            if (
                comando === "CONSULTAR_HISTORICO"
            ) {

                const lista =
                    await prisma.participacao.findMany({

                        where:{
                            voluntarioId:
                            voluntario.id
                        },

                        orderBy:{
                            id:"desc"
                        }

                    });


                return res.json({

                    canal,

                    ...chatResponse.historico(lista)

                });

            }


            if (
                comando === "CONSULTAR_BENEFICIOS"
            ) {

                const beneficios =
                    await prisma.beneficio.findMany({

                        orderBy:{
                            id:"asc"
                        }

                    });


                return res.json({

                    canal,

                    ...chatResponse.beneficios(beneficios)

                });

            }


            if (
                comando === "RESGATAR_BENEFICIO"
            ) {

                chatSession.set(
                    identificador,
                    {
                        estado:
                        "AGUARDANDO_TIPO_BENEFICIO"
                    }
                );


                const beneficios =
                    await prisma.beneficio.findMany({

                        orderBy:{
                            id:"asc"
                        }

                    });


                return res.json({

                    canal,

                    titulo:
                    "Escolha um benefício",

                    beneficios,

                    mensagem:
                    "Envie o tipo do benefício desejado (ex.: PARCERIA_LOCAL)."

                });

            }


        } catch(error) {

            console.error(
                "ERRO CONTROLLER CHAT:",
                error
            );

            return res.status(500).json({

                error:
                error.message

            });

        }

    };

};
