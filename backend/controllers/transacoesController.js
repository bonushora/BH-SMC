const ledgerService = require('../services/ledgerService');

module.exports = function(prisma) {

    return async function(req, res) {

        try {

            const resultado =
                await ledgerService.processTransaction(
                    prisma,
                    req.body
                );

            return res.json(resultado);


        } catch (error) {

            console.error(
                "ERRO CONTROLLER TRANSACOES:",
                error
            );


            if (error.status) {

                return res
                    .status(error.status)
                    .json(error.payload);

            }


            return res.status(500).json({
                error:
                "Erro ao processar transação no Ledger."
            });

        }

    };

};
