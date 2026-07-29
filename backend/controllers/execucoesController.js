module.exports = function (prisma) {

    return {


        checkin: async function (req, res) {

            try {

                const {
                    participacaoId,
                    latitude,
                    longitude
                } = req.body;


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

                const id = Number(req.params.id);


                const execucao =
                    await prisma.execucaoParticipacao.update({

                        where: {
                            id
                        },

                        data: {

                            checkoutEm: new Date(),

                            status: "FINALIZADA"

                        }

                    });


                res.json({
                    success:true,
                    execucao
                });


            } catch(error){

                res.status(500).json({
                    error:error.message
                });

            }

        },




        aprovar: async function(req,res){

            try {


                const id =
                    Number(req.params.id);



                const execucao =
                    await prisma.execucaoParticipacao.findUnique({

                        where:{
                            id
                        },

                        include:{
                            participacao:{
                                include:{
                                    voluntario:true,
                                    acao:true
                                }
                            }
                        }

                    });



                if(!execucao){

                    return res.status(404).json({
                        error:"Execução não encontrada"
                    });

                }



                const horas =
                    execucao.participacao.acao.valorBonusHora;



                const voluntarioId =
                    execucao.participacao.voluntarioId;



                await prisma.voluntario.update({

                    where:{
                        id: voluntarioId
                    },

                    data:{
                        saldo:{
                            increment: horas
                        }
                    }

                });



                const transacao =
                    await prisma.transacao.create({

                        data:{

                            voluntarioId,

                            horas,

                            tipo:"CREDITO_ACAO",

                            descricao:
                            "Crédito por participação em ação BônusHora"

                        }

                    });



                await prisma.execucaoParticipacao.update({

                    where:{
                        id
                    },

                    data:{
                        status:"APROVADA"
                    }

                });



                res.json({

                    success:true,

                    credito:horas,

                    transacao

                });



            }catch(error){

                res.status(500).json({
                    error:error.message
                });

            }

        }


    };

};
