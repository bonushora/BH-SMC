from pathlib import Path

DESTINO = Path(__file__).resolve().parents[1] / "scripts" / "start.js"

CODIGO = r'''require("dotenv").config();

const { spawn } = require("child_process");

const checkEnv = require("../bootstrap/checkEnv");
const checkDatabase = require("../bootstrap/checkDatabase");


async function start() {

    try {

        console.log("");
        console.log("====================================");
        console.log(" BH-SMC BOOTSTRAP");
        console.log(" Inicialização determinística");
        console.log("====================================");
        console.log("");

        checkEnv();

        await checkDatabase();

        console.log("✓ Ambiente pronto.");
        console.log("");

        const server = spawn(
            "node",
            [
                "index.js"
            ],
            {
                stdio: "inherit"
            }
        );


        server.on(
            "exit",
            code => {

                process.exit(
                    code || 0
                );

            }
        );


    } catch (error) {

        console.error("");

        console.error(
            "❌ Falha no bootstrap:"
        );

        console.error(
            error.message
        );

        console.error("");

        process.exit(1);

    }

}


start();
'''

DESTINO.parent.mkdir(
    parents=True,
    exist_ok=True
)

DESTINO.write_text(
    CODIGO,
    encoding="utf-8"
)

print(
    f"✓ Arquivo gerado: {DESTINO}"
)
