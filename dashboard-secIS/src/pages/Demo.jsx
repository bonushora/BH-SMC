export default function Demo(){


const etapas = [

{
titulo:"1. Cadastro do cidadão",
descricao:
"O participante entra no ecossistema BônusHora Social."
},


{
titulo:"2. Participação em ação",
descricao:
"O cidadão participa de uma ação socioambiental cadastrada."
},


{
titulo:"3. Execução registrada",
descricao:
"A atividade possui registro operacional e acompanhamento."
},


{
titulo:"4. Validação",
descricao:
"A execução passa pelo processo de aprovação."
},


{
titulo:"5. Crédito BônusHora",
descricao:
"O participante recebe reconhecimento proporcional à contribuição."
},


{
titulo:"6. Auditoria",
descricao:
"Todas as movimentações permanecem registradas no Ledger."
}

];


return (

<section className="demo-section">


<h2>
Demonstração do Piloto SECIS
</h2>


<p>
Fluxo operacional completo do reconhecimento
de participação social.
</p>



<div className="demo-grid">


{
etapas.map((etapa,index)=>(

<div
className="demo-card"
key={index}
>


<h3>
{etapa.titulo}
</h3>


<p>
{etapa.descricao}
</p>


</div>

))
}


</div>


</section>

);


}
