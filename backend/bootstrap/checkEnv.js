const fs = require("fs");
const path = require("path");

module.exports = function checkEnv() {

    const envPath = path.join(__dirname, "..", ".env");

    if (!fs.existsSync(envPath)) {
        throw new Error(
            "Arquivo .env não encontrado."
        );
    }

    require("dotenv").config({
        path: envPath
    });

    const required = [
        "DATABASE_URL",
        "DIRECT_URL"
    ];

    for (const key of required) {

        if (
            !process.env[key] ||
            process.env[key].trim() === ""
        ) {

            throw new Error(
                `Variável ${key} não definida.`
            );

        }

    }

    const url = process.env.DATABASE_URL;

    if (
        url.includes("pooler.supabase.com") ||
        url.includes("supabase.co")
    ) {

        throw new Error(
            [
                "",
                "======================================================",
                "ERRO DE SEGURANÇA",
                "",
                "O backend está apontando para um banco Supabase Cloud.",
                "",
                "O BH-SMC utiliza como fonte da verdade",
                "o PostgreSQL CENTRAL local.",
                "",
                "Corrija DATABASE_URL antes de iniciar.",
                "======================================================"
            ].join("\n")
        );

    }

    console.log("✓ Ambiente validado.");

};
