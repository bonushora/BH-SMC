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



            if (
                comando !== "CONSULTAR_SALDO" &&
                comando !== "CONSULTAR_DASHBOARD"
            ) {

                return res.json({

                    canal,

                    response:
                    "Comando recebido. Em breve novas funcionalidades estarão disponíveis.",

                    comando

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
                    "Bem-vindo ao Ledger SECIS! Você ainda não está cadastrado.",

                    opcoes:[

                        "Cadastrar Agora"

                    ]

                });

            }



            if (
                comando === "CONSULTAR_SALDO"
            ) {


                return res.json({

                    canal,

                    usuario: {

                        numero:
                        voluntario.numero

                    },


                    ...chatResponse.saldo(voluntario),


                    opcoes:[

                        "Ver Benefícios Disponíveis",

                        "Ver Dashboard",

                        "Voltar ao Menu"

                    ]

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

                    usuario: {

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
