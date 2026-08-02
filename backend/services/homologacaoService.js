const ledgerIntegrityService =
    require('./ledgerIntegrityService');


async function processResgate(prisma, data) {

    const { whatsapp, tipoBeneficio } = data;


    if (!whatsapp || !tipoBeneficio) {

        const error = new Error();

        error.status = 400;

        error.payload = {

            success: false,

            error:
            "Parâmetros 'whatsapp' e 'tipoBeneficio' são obrigatórios."

        };

        throw error;

    }


    const voluntario =
        await prisma.voluntario.findUnique({

            where: {

                numero: whatsapp

            }

        });


    if (!voluntario) {

        const error = new Error();

        error.status = 404;

        error.payload = {

            success: false,

            error:
            "Voluntário não encontrado."

        };

        throw error;

    }


    const beneficio =
        await prisma.beneficio.findFirst({

            where: {

                tipo: tipoBeneficio

            }

        });


    if (!beneficio) {

        const error = new Error();

        error.status = 404;

        error.payload = {

            success: false,

            error:
            "Benefício não homologado."

        };

        throw error;

    }


    if (
        voluntario.saldo < beneficio.custoHoras
    ) {

        const error = new Error();

        error.status = 400;

        error.payload = {

            success:false,

            error:
            `Saldo insuficiente. Necessário: ${beneficio.custoHoras}h, Disponível: ${voluntario.saldo}h.`

        };

        throw error;

    }


    await ledgerIntegrityService.validateResgate(
        prisma,
        beneficio.custoHoras
    );


    const [
        transacao,
        voluntarioAtualizado
    ] =
    await prisma.$transaction([


        prisma.transacao.create({

            data: {

                voluntarioId:
                voluntario.id,

                tipo:
                "RESGATE",

                horas:
                -beneficio.custoHoras,

                descricao:
                `Resgate homologado: ${beneficio.titulo}`

            }

        }),


        prisma.voluntario.update({

            where: {

                id:
                voluntario.id

            },

            data: {

                saldo: {

                    decrement:
                    beneficio.custoHoras

                }

            }

        })


    ]);


    return {

        success:true,


        comprovante: {

            protocolo:
            `SECIS-${transacao.id}-${Date.now().toString().slice(-4)}`,


            beneficiario:
            voluntario.numero,


            beneficio:
            beneficio.titulo,


            horasDebitadas:
            beneficio.custoHoras,


            saldoRestante:
            voluntarioAtualizado.saldo,


            data:
            new Date().toISOString(),


            status:
            "HOMOLOGADO E VALIDADO"

        }

    };

}


module.exports = {

    processResgate

};
