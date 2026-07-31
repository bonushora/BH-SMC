const chatCommands =
    require('../services/chat/chatCommands');


const chatResponse =
    require('../services/chat/chatResponse');



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



            const comando =
                chatCommands.interpretar(
                    req.body.mensagem || ""
                );



            const comandosPermitidos = [

                "MENU_PRINCIPAL",
                "CONSULTAR_SALDO",
                "CONSULTAR_DASHBOARD",
                "CONSULTAR_ACOES",
                "CONSULTAR_BENEFICIOS",
                "CONSULTAR_HISTORICO"

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

                    where: {

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


                return res.json({

                    canal,

                    ...chatResponse.beneficios([])

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
