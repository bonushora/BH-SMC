const { Client } = require("pg");

module.exports = async function checkDatabase() {

    const DATABASE_URL = process.env.DATABASE_URL;

    console.log("");
    console.log("Verificando PostgreSQL central...");
    console.log("");

    for (let tentativa = 1; tentativa <= 30; tentativa++) {

        try {

            const client = new Client({
                connectionString: DATABASE_URL
            });

            await client.connect();

            await client.query(
                "SELECT 1"
            );

            await client.end();

            console.log(
                "✓ PostgreSQL central disponível."
            );

            console.log("");

            return;

        } catch (error) {

            process.stdout.write(
                `Tentativa ${tentativa}/30 aguardando banco...\r`
            );

            await new Promise(
                resolve => setTimeout(resolve, 2000)
            );

        }

    }

    throw new Error(
        "PostgreSQL central indisponível após 30 tentativas."
    );

};
