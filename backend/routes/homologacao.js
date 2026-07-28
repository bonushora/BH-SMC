const express = require('express');

function createHomologacaoRouter(prisma) {
    const router = express.Router();

    router.post('/resgate', async (req, res) => {
        const { whatsapp, tipoBeneficio } = req.body;

        if (!whatsapp || !tipoBeneficio) {
            return res.status(400).json({
                success: false,
                error: "Parâmetros 'whatsapp' e 'tipoBeneficio' são obrigatórios."
            });
        }

        try {
            const voluntario = await prisma.voluntario.findUnique({
                where: { numero: whatsapp }
            });

            if (!voluntario) {
                return res.status(404).json({
                    success: false,
                    error: "Voluntário não encontrado."
                });
            }

            const beneficio = await prisma.beneficio.findFirst({
                where: { tipo: tipoBeneficio }
            });

            if (!beneficio) {
                return res.status(404).json({
                    success: false,
                    error: "Benefício não homologado."
                });
            }

            if (voluntario.saldo < beneficio.custoHoras) {
                return res.status(400).json({
                    success: false,
                    error: `Saldo insuficiente. Necessário: ${beneficio.custoHoras}h, Disponível: ${voluntario.saldo}h.`
                });
            }

            const [transacao, voluntarioAtualizado] =
                await prisma.$transaction([
                    prisma.transacao.create({
                        data: {
                            voluntarioId: voluntario.id,
                            tipo: "RESGATE",
                            horas: -beneficio.custoHoras,
                            descricao: `Resgate homologado: ${beneficio.titulo}`
                        }
                    }),

                    prisma.voluntario.update({
                        where: { id: voluntario.id },
                        data: {
                            saldo: {
                                decrement: beneficio.custoHoras
                            }
                        }
                    })
                ]);

            const comprovante = {
                protocolo: `SECIS-${transacao.id}-${Date.now().toString().slice(-4)}`,
                beneficiario: voluntario.numero,
                beneficio: beneficio.titulo,
                horasDebitadas: beneficio.custoHoras,
                saldoRestante: voluntarioAtualizado.saldo,
                data: new Date().toISOString(),
                status: "HOMOLOGADO E VALIDADO"
            };

            return res.status(200).json({
                success: true,
                comprovante
            });

        } catch (error) {
            console.error("[HOMOLOGAÇÃO ERROR]", error);

            return res.status(500).json({
                success: false,
                error: "Erro interno no processamento."
            });
        }
    });

    return router;
}

module.exports = createHomologacaoRouter;
