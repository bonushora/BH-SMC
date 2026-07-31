module.exports = function(prisma){

    return {

        listar: async function(req,res){

            try {

                const ledger =
                    await prisma.transacao.findMany({

                        include:{

                            voluntario:true,

                            execucao:{

                                include:{

                                    participacao:{

                                        include:{

                                            acao:true,

                                            voluntario:true

                                        }

                                    }

                                }

                            }

                        },

                        orderBy:{
                            criadoEm:"desc"
                        }

                    });


                return res.json(ledger);


            }catch(error){

                return res.status(500).json({

                    error:error.message

                });

            }

        }

    };

};

