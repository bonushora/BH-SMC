const ledgerService = require('../services/ledgerService');

module.exports = function (prisma) {

    return {

        listar: async function(req,res){

            try{

                const transacoes =
                    await prisma.transacao.findMany({

                        include:{
                            voluntario:true,
                            execucao:true
                        },

                        orderBy:{
                            criadoEm:"desc"
                        }

                    });

                res.json(transacoes);

            }catch(error){

                res.status(500).json({
                    error:error.message
                });

            }

        },


        criar: async function(req,res){

            try{

                const resultado =
                    await ledgerService.processTransaction(
                        prisma,
                        req.body
                    );

                res.json(resultado);

            }catch(error){

                if(error.status){

                    return res
                        .status(error.status)
                        .json(error.payload);

                }

                res.status(500).json({
                    error:"Erro ao processar transação no Ledger."
                });

            }

        }

    };

};
