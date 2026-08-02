require("dotenv").config();

const prisma =
    require("../database/prisma");


async function main() {

    console.log(
        "🌱 Iniciando seed BH-SMC MVP"
    );


    await prisma.transacao.deleteMany();

    await prisma.execucaoParticipacao.deleteMany();

    await prisma.participacao.deleteMany();

    await prisma.beneficio.deleteMany();

    await prisma.acao.deleteMany();

    await prisma.coordenador.deleteMany();

    await prisma.voluntario.deleteMany();



    const coordenador =
        await prisma.coordenador.create({

            data:{

                nome:
                "Coordenador SECIS",

                telefone:
                "71988888888"

            }

        });



    const voluntario =
        await prisma.voluntario.create({

            data:{

                numero:
                "71999999999",

                saldo:
                0

            }

        });



    await prisma.transacao.create({

        data:{

            voluntarioId:
            voluntario.id,

            horas:
            30,

            tipo:
            "GENESIS",

            descricao:
            "Crédito inicial do piloto BônusHora SECIS"

        }

    });



    const acao =
        await prisma.acao.create({

            data:{

                nome:
                "Mutirão Socioambiental Salvador",

                descricao:
                "Ação piloto de participação cidadã.",

                categoria:
                "MEIO_AMBIENTE",

                valorBonusHora:
                5,

                coordenadorId:
                coordenador.id,

                ativo:
                true

            }

        });



    await prisma.beneficio.createMany({

        data:[

            {
                tipo:
                "PARCERIA_LOCAL",

                titulo:
                "Desconto em comércio parceiro",

                custoHoras:
                5
            },

            {
                tipo:
                "EVENTO_SECIS",

                titulo:
                "Participação em evento socioambiental",

                custoHoras:
                10
            },

            {
                tipo:
                "RECONHECIMENTO",

                titulo:
                "Certificado de participação BônusHora",

                custoHoras:
                3
            }

        ]

    });



    const participacao =
        await prisma.participacao.create({

            data:{

                voluntarioId:
                voluntario.id,

                acaoId:
                acao.id,

                status:
                "APROVADO",

                aprovadoEm:
                new Date()

            }

        });



    const execucao =
        await prisma.execucaoParticipacao.create({

            data:{

                participacaoId:
                participacao.id,

                horasRealizadas:
                5,

                status:
                "FINALIZADA",

                checkinEm:
                new Date(),

                checkoutEm:
                new Date()

            }

        });



    await prisma.transacao.create({

        data:{

            voluntarioId:
            voluntario.id,

            execucaoId:
            execucao.id,

            horas:
            5,

            tipo:
            "BONUS",

            descricao:
            "Participação em ação socioambiental piloto"

        }

    });



    /*
      Reconciliação determinística:
      Ledger é a fonte da verdade.
    */


    const saldoLedger =
        await prisma.transacao.aggregate({

            where:{

                voluntarioId:
                voluntario.id

            },

            _sum:{

                horas:true

            }

        });



    await prisma.voluntario.update({

        where:{

            id:
            voluntario.id

        },

        data:{

            saldo:
            saldoLedger._sum.horas || 0

        }

    });



    console.log(
        "✅ Seed BH-SMC MVP concluído"
    );

}


main()

.catch(error => {

    console.error(error);

    process.exit(1);

})

.finally(async () => {

    await prisma.$disconnect();

});
