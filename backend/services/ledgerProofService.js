const crypto = require("crypto");


async function gerarProof(prisma) {


    const voluntarios =
        await prisma.voluntario.findMany({

            orderBy:{
                id:"asc"
            }

        });


    const transacoes =
        await prisma.transacao.findMany({

            orderBy:{
                id:"asc"
            }

        });


    const estado = {

        protocolo:
        "BH-SMC",

        ambiente:
        "SECIS-PILOTO",

        versao:
        "ledger-proof-v1",

        voluntarios:
        voluntarios.map(v => ({

            id:
            v.id,

            numero:
            v.numero,

            saldo:
            v.saldo

        })),


        transacoes:
        transacoes.map(t => ({

            id:
            t.id,

            voluntarioId:
            t.voluntarioId,

            horas:
            t.horas,

            tipo:
            t.tipo

        }))

    };


    const hashEstado =
        crypto
        .createHash("sha256")
        .update(
            JSON.stringify(estado)
        )
        .digest("hex");


    return {

        protocolo:
        estado.protocolo,

        ambiente:
        estado.ambiente,

        versao:
        estado.versao,

        hashEstado,


        resumo:{

            voluntarios:
            voluntarios.length,

            transacoes:
            transacoes.length,

            saldoTotal:
            voluntarios.reduce(

                (total, voluntario)=>
                total + voluntario.saldo,

                0

            )

        },


        timestamp:
        new Date().toISOString()

    };

}


module.exports = {

    gerarProof

};
