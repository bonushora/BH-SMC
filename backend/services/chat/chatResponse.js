module.exports = {

    saldo: function(voluntario){

        return {

            titulo:
            "Meu Saldo BônusHora",

            saldo:
            voluntario.saldo,

            mensagem:
            `Você possui ${voluntario.saldo} bônus-horas.`

        };

    },


    dashboard: function(dados){

        return {

            titulo:
            "Dashboard do Voluntário",

            dashboard:
            dados,

            mensagem:
            "Dashboard carregado com sucesso."

        };

    }

};

