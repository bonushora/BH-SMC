const chatCommands =
    require('../services/chat/chatCommands');


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
                comando !== "CONSULTAR_SALDO"
            ) {


                if (
                    comando === "CONSULTAR_DASHBOARD"
                ) {


                    const voluntario =
                        await prisma.voluntario.findUnique({

                            where:{
                                numero: identificador
                            },

                            include:{

                                transacoes:true,

                                participacoes:true

                            }

                        });


                    if(!voluntario){

                        return res.json({

                            canal,

                            response:
                            "Voluntário não encontrado."

                        });

                    }


                    return res.json({

                        canal,

                        usuario:{

                            numero:
                            voluntario.numero

                        },

                        dashboard:{

                            saldoAtual:
                            voluntario.saldo,

                            participacoes:
                            voluntario.participacoes.length,

                            transacoes:
                            voluntario.transacoes.length

                        },

                        response:
                        "Dashboard do voluntário carregado."

                    });


                }


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



            return res.json({

                canal,

                usuario: {

                    numero:
                    voluntario.numero

                },

                response:
                `Seu saldo atual é de ${voluntario.saldo} bônus-horas.`,

                opcoes:[

                    "Ver Benefícios Disponíveis",

                    "Ver Dashboard",

                    "Voltar ao Menu"

                ]

            });



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
