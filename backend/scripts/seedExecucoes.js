require("dotenv").config();

const prisma = require("../database/prisma");

function horasAleatorias() {
    return Number((2 + Math.random() * 4).toFixed(2));
}

async function main() {

    console.log("\n==============================");
    console.log(" BH-SMC");
    console.log(" Seed de Execuções");
    console.log("==============================\n");

    const participacoes =
        await prisma.participacao.findMany({

            where: {
                status: "APROVADO",
                execucao: null
            }

        });

    let total = 0;

    for (const participacao of participacoes) {

        const horas = horasAleatorias();

        const checkout = new Date();

        const checkin =
            new Date(
                checkout.getTime() - horas * 60 * 60 * 1000
            );

        await prisma.execucaoParticipacao.create({

            data: {

                participacaoId: participacao.id,

                checkinEm: checkin,

                checkoutEm: checkout,

                horasRealizadas: horas,

                latitude: -12.9718,

                longitude: -38.5011,

                status: "FINALIZADA"

            }

        });

        total++;

    }

    console.log("✓ Execuções criadas.");
    console.log("");
    console.log("Total:", total);

}

main()
.catch(console.error)
.finally(async () => {

    await prisma.$disconnect();

});
