const { Client } = require("pg");

module.exports = async function checkDatabase() {

    const DATABASE_URL = process.env.DATABASE_URL;

    console.log("");
    console.log("Verificando PostgreSQL central...");
    console.log("");

    for (let tentativa = 1; tentativa <= 5; tentativa++) {

        try {

            const client = new Client({
                connectionString: DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });

            await client.connect();

            await client.query("SELECT 1");

            await client.end();

            console.log(
                "✓ PostgreSQL central disponível."
            );

            console.log("");

            return;

        } catch (error) {

            console.log(
                `Tentativa ${tentativa}/5 falhou: ${error.message}`
            );

            await new Promise(
                resolve => setTimeout(resolve, 3000)
            );

        }

    }

    throw new Error(
        "PostgreSQL central indisponível após tentativas de diagnóstico."
    );

};
