require("dotenv").config();

const prisma = require("../database/prisma");

const telefoneSECIS = "71988888888";

const acoes = [

{
nome:"Mutirão de Limpeza",
categoria:"MEIO_AMBIENTE",
descricao:"Limpeza comunitária",
valorBonusHora:10
},

{
nome:"Plantio Urbano",
categoria:"ARBORIZACAO",
descricao:"Plantio de mudas",
valorBonusHora:15
},

{
nome:"Proteção Animal",
categoria:"BEM_ESTAR_ANIMAL",
descricao:"Apoio a campanhas",
valorBonusHora:20
},

{
nome:"Educação Ambiental",
categoria:"EDUCACAO",
descricao:"Ações educativas",
valorBonusHora:12
},

{
nome:"Reciclagem Comunitária",
categoria:"RECICLAGEM",
descricao:"Coleta seletiva",
valorBonusHora:8
},

{
nome:"Revitalização de Praça",
categoria:"URBANISMO",
descricao:"Manutenção urbana",
valorBonusHora:18
}

];

async function main(){

console.log("\n==============================");
console.log(" BH-SMC");
console.log(" Seed de Ações");
console.log("==============================\n");

const coordenador =
await prisma.coordenador.findUnique({

where:{
telefone:telefoneSECIS
}

});

if(!coordenador){

throw new Error("Coordenador SECIS não encontrado.");

}

let total=0;

for(const item of acoes){

await prisma.acao.create({

data:{

nome:item.nome,

categoria:item.categoria,

descricao:item.descricao,

valorBonusHora:item.valorBonusHora,

coordenadorId:coordenador.id

}

});

total++;

}

console.log("✓ Ações cadastradas.");
console.log("");
console.log("Total:",total);

}

main()
.catch(console.error)
.finally(async()=>{

await prisma.$disconnect();

});
