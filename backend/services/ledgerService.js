async function processTransaction(prisma, data) {
    const { numero, horas, tipo, descricao } = data;

    const voluntario = await prisma.voluntario.findUnique({
        where: { numero }
    });

    if (!voluntario) {
        const error = new Error("Voluntário não encontrado.");
        error.status = 404;
        error.payload = {
            error: "Voluntário não encontrado."
        };
        throw error;
    }

    const novoSaldo = voluntario.saldo + horas;

    if (novoSaldo < 0) {
        const error = new Error("Saldo insuficiente!");
        error.status = 400;
        error.payload = {
            error: "Saldo insuficiente!",
            saldoAtual: voluntario.saldo,
            tentativaResgate: Math.abs(horas)
        };
        throw error;
    }

    const [transacao, voluntarioAtualizado] =
        await prisma.$transaction([
            prisma.transacao.create({
                data: {
                    voluntarioId: voluntario.id,
                    horas,
                    tipo,
                    descricao
                }
            }),

            prisma.voluntario.update({
                where: {
                    id: voluntario.id
                },
                data: {
                    saldo: novoSaldo
                }
            })
        ]);

    return {
        success: true,
        tipoTransacao: tipo,
        horasMovimentadas: horas,
        novoSaldo: voluntarioAtualizado.saldo,
        transacaoId: transacao.id
    };
}

module.exports = {
    processTransaction
};
