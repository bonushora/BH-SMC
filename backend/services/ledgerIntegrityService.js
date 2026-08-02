async function validateResgate(prisma, custoHoras) {

    const resultado =
        await prisma.transacao.aggregate({

            _sum: {
                horas: true
            }

        });


    const saldoLedger =
        resultado._sum.horas || 0;


    if (saldoLedger < custoHoras) {

        const error = new Error(
            "Resgate bloqueado: saldo global do Ledger insuficiente."
        );

        error.status = 400;

        error.payload = {

            success: false,

            error:
            "Integridade do Ledger violada.",

            saldoLedger,

            tentativaDebito:
            custoHoras

        };

        throw error;

    }


    return true;

}


module.exports = {

    validateResgate

};
