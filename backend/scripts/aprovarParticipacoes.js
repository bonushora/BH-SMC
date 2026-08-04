require("dotenv").config();

const prisma = require("../database/prisma");

async function main(){

console.log("\n==============================");
console.log(" BH-SMC");
console.log(" Aprovação de Participações");
console.log("==============================\n");

const resultado =
await prisma.participacao.updateMany({

where:{
status:"PENDENTE"
},

data:{
status:"APROVADO",
aprovadoEm:new Date()
}

});

console.log("✓ Participações aprovadas.");
console.log("");
console.log("Total:",resultado.count);

}

main()
.catch(console.error)
.finally(async()=>{

await prisma.$disconnect();

});
