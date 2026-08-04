require("dotenv").config();

const prisma = require("../database/prisma");

function sample(array, quantidade) {

    const copia = [...array];
    const resultado = [];

    while (resultado.length < quantidade && copia.length > 0) {

        const indice = Math.floor(Math.random() * copia.length);
        resultado.push(copia.splice(indice, 1)[0]);

    }

    return resultado;

}

async function main() {

    console.log("\n==============================");
    console.log(" BH-SMC");
    console.log(" Seed de Participações");
    console.log("==============================\n");

    const voluntarios =
        await prisma.voluntario.findMany();

    const acoes =
        await prisma.acao.findMany();

    let total = 0;

    for (const voluntario of voluntarios) {

        const quantidade =
            Math.floor(Math.random() * 3) + 1;

        const selecionadas =
            sample(acoes, quantidade);

        for (const acao of selecionadas) {

            const existente =
                await prisma.participacao.findFirst({

                    where: {
                        voluntarioId: voluntario.id,
                        acaoId: acao.id
                    }

                });

            if (existente) continue;

            await prisma.participacao.create({

                data: {

                    voluntarioId: voluntario.id,

                    acaoId: acao.id,

                    status: "PENDENTE"

                }

            });

            total++;

        }

    }

    console.log("✓ Participações criadas.");
    console.log("");
    console.log("Total:", total);

}

main()
.catch(console.error)
.finally(async()=>{

    await prisma.$disconnect();

});
