async function aprovarExecucao(prisma,id){

const resultado=
await prisma.$transaction(async(tx)=>{

const execucao=
await tx.execucaoParticipacao.findUnique({

where:{id},

include:{

participacao:{

include:{

voluntario:true,
acao:true

}

}

}

});

if(!execucao){

throw new Error("Execução não encontrada.");

}

if(execucao.status==="APROVADA"){

throw new Error("Execução já aprovada.");

}

const horas=
execucao.participacao.acao.valorBonusHora;

const voluntarioId=
execucao.participacao.voluntarioId;

await tx.voluntario.update({

where:{
id:voluntarioId
},

data:{

saldo:{
increment:horas
}

}

});

const transacao=
await tx.transacao.create({

data:{

voluntarioId,

execucaoId:id,

horas,

tipo:"CREDITO_ACAO",

descricao:
"Crédito por participação em ação BônusHora"

}

});

await tx.execucaoParticipacao.update({

where:{
id
},

data:{
status:"APROVADA"
}

});

return{

horas,
transacao

};

});

return resultado;

}

module.exports={

aprovarExecucao

};
