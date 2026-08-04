require("dotenv").config();

const prisma = require("../database/prisma");

async function upsertCoordenador(nome, telefone) {

    return prisma.coordenador.upsert({

        where: {
            telefone
        },

        update: {},

        create: {
            nome,
            telefone
        }

    });

}

async function main() {

    console.log("");
    console.log("====================================");
    console.log(" BH-SMC PILOTO");
    console.log(" Seed Institucional");
    console.log("====================================");
    console.log("");

    const coordenadores = [

        {
            nome: "Maria Oliveira",
            telefone: "71990000001"
        },

        {
            nome: "João Santos",
            telefone: "71990000002"
        },

        {
            nome: "Ana Souza",
            telefone: "71990000003"
        },

        {
            nome: "Carlos Lima",
            telefone: "71990000004"
        },

        {
            nome: "Fernanda Rocha",
            telefone: "71990000005"
        }

    ];

    for (const coordenador of coordenadores) {

        await upsertCoordenador(

            coordenador.nome,

            coordenador.telefone

        );

    }

    const total =
        await prisma.coordenador.count();

    console.log("");

    console.log("✓ Coordenadores cadastrados.");

    console.log("");

    console.log(`Total: ${total}`);

    console.log("");

}

main()

.then(async () => {

    await prisma.$disconnect();

})

.catch(async (error) => {

    console.error(error);

    await prisma.$disconnect();

    process.exit(1);

});
