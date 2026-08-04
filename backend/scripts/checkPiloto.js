require("dotenv").config();

const prisma = require("../database/prisma");

async function main(){

console.log(`
==============================
 BH-SMC PILOTO
 HEALTH CHECK
==============================
`);

const dados = {

voluntarios:
await prisma.voluntario.count(),

coordenadores:
await prisma.coordenador.count(),

acoes:
await prisma.acao.count(),

participacoes:
await prisma.participacao.count(),

execucoes:
await prisma.execucaoParticipacao.count(),

transacoes:
await prisma.transacao.count()

};


console.table(dados);


const saldo =
await prisma.voluntario.aggregate({

_sum:{
saldo:true
}

});


const horas =
await prisma.transacao.aggregate({

_sum:{
horas:true

}

});


console.log(`
Indicadores Sociais
-------------------
Saldo distribuído:
${saldo._sum.saldo || 0}

Horas registradas:
${horas._sum.horas || 0}

`);


console.log("STATUS: PILOTO OPERACIONAL");


await prisma.$disconnect();

}


main();
