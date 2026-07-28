module.exports = function(prisma) {

    return async function(req, res) {

        const { whatsapp } = req.body;


        try {

            if (!whatsapp) {

                return res.status(400).json({
                    error: "Número de WhatsApp obrigatório."
                });

            }


            const voluntario =
                await prisma.voluntario.findUnique({

                    where: {
                        numero: whatsapp
                    }

                });


            if (!voluntario) {

                return res.json({

                    response:
                    "Bem-vindo ao Ledger SECIS! Você ainda não está cadastrado.",

                    opcoes:[
                        "Cadastrar Agora"
                    ]

                });

            }


            return res.json({

                response:
                `Seu saldo atual é de ${voluntario.saldo} bônus-horas.`,

                opcoes:[
                    "Ver Benefícios Disponíveis",
                    "Voltar ao Menu"
                ]

            });


        } catch(error) {


            console.error(
                "ERRO CONTROLLER CHAT:",
                error
            );


            return res.status(500).json({
                error:error.message
            });


        }

    };

};
