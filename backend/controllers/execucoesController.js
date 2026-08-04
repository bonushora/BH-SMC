const execucaoService =
    require("../services/execucaoService");

module.exports = function (prisma) {

    return {


        listar: async function(req,res){

            try {

                const execucoes =
                    await prisma.execucaoParticipacao.findMany({

                        include:{

                            participacao:{
                                include:{
                                    voluntario:true,
                                    acao:true
                                }
                            },

                            transacoes:true

                        },

                        orderBy:{
                            criadoEm:"desc"
                        }

                    });


                res.json(execucoes);


            }catch(error){

                res.status(500).json({
                    error:error.message
                });

            }

        },



        checkin: async function (req, res) {

            try {

                const {
                    participacaoId,
                    latitude,
                    longitude
                } = req.body;


                const existente =
                    await prisma.execucaoParticipacao.findUnique({

                        where:{
                            participacaoId
                        }

                    });


                if(existente){

                    return res.status(409).json({

                        error:"Esta participação já possui uma execução."

                    });

                }


                const execucao =
                    await prisma.execucaoParticipacao.create({

                        data: {

                            participacaoId,

                            checkinEm: new Date(),

                            latitude,

                            longitude,

                            status: "EM_EXECUCAO"

                        }

                    });


                res.json({
                    success: true,
                    execucao
                });


            } catch (error) {

                res.status(500).json({
                    error: error.message
                });

            }

        },



        checkout: async function (req, res) {

            try {

                const id =
                    Number(req.params.id);


                const execucaoAtual =
                    await prisma.execucaoParticipacao.findUnique({

                        where:{
                            id
                        }

                    });


                if(!execucaoAtual){

                    return res.status(404).json({

                        error:"Execução não encontrada."

                    });

                }


                if(execucaoAtual.status === "FINALIZADA" ||
                   execucaoAtual.status === "APROVADA"){

                    return res.status(400).json({

                        error:"Execução já finalizada."

                    });

                }


                const checkoutEm =
                    new Date();


                const horasRealizadas =
                    Number(
                        (
                            (checkoutEm - execucaoAtual.checkinEm)
                            / 1000
                            / 60
                            / 60
                        ).toFixed(2)
                    );


                const execucao =
                    await prisma.execucaoParticipacao.update({

                        where:{
                            id
                        },

                        data:{

                            checkoutEm,

                            horasRealizadas,

                            status:"FINALIZADA"

                        }

                    });


                res.json({

                    success:true,

                    execucao

                });


            }catch(error){

                res.status(500).json({

                    error:error.message

                });

            }

        },


        aprovar: async function(req,res){

            try {

                const resultado =
                    await execucaoService.aprovarExecucao(
                        prisma,
                        Number(req.params.id)
                    );


                res.json({

                    success:true,

                    credito:resultado.horas,

                    transacao:resultado.transacao

                });


            }catch(error){

                res.status(400).json({

                    error:error.message

                });

            }

        }


    };

};
