const fs = require("fs");
const path = require("path");

module.exports = function checkEnv() {

    const envPath = path.join(
        __dirname,
        "..",
        ".env"
    );

    if (fs.existsSync(envPath)) {

        require("dotenv").config({
            path: envPath
        });

    }

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

    console.log(
        "✓ Ambiente validado."
    );

};
