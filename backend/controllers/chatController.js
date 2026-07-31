const chatGateway =
    require('../services/chatGateway');


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
                chatGateway.interpretarMensagem({

                    canal,

                    identificador,

                    mensagem:
                    req.body.mensagem || ""

                });



            const voluntario =
                await prisma.voluntario.findUnique({

                    where: {

                        numero:
                        identificador

                    },

                    include: {

                        participacoes: {

                            include: {

                                acao:true

                            }

                        },

                        transacoes:true

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



            switch(comando.comando) {


                case "CONSULTAR_SALDO":


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



                case "CONSULTAR_DASHBOARD":


                    return res.json({

                        canal,

                        usuario: {

                            numero:
                            voluntario.numero

                        },

                        dashboard: {

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



                default:


                    return res.json({

                        canal,

                        response:
                        "Comando recebido. Em breve novas funcionalidades estarão disponíveis.",

                        comando:
                        comando.comando

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
