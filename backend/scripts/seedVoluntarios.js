require("dotenv").config();

const prisma = require("../database/prisma");

async function main(){

console.log("\n==============================");
console.log(" BH-SMC");
console.log(" Seed de Voluntários");
console.log("==============================\n");

let total=0;

for(let i=1;i<=100;i++){

const numero="71991"+String(i).padStart(6,"0");

await prisma.voluntario.upsert({

where:{
numero
},

update:{},

create:{

numero,

saldo:10

}

});

total++;

}

console.log("✓ Voluntários cadastrados.");
console.log("");
console.log("Total:",total);

}

main()
.catch(console.error)
.finally(async()=>{

await prisma.$disconnect();

});
