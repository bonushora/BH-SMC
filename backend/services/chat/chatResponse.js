module.exports = {

    menu: function(){

        return {

            titulo:
            "Menu BônusHora",

            opcoes:[

                {
                    texto:
                    "Meu saldo",

                    comando:
                    "CONSULTAR_SALDO"
                },

                {
                    texto:
                    "Meu dashboard",

                    comando:
                    "CONSULTAR_DASHBOARD"
                },

                {
                    texto:
                    "Minhas ações",

                    comando:
                    "CONSULTAR_ACOES"
                },

                {
                    texto:
                    "Meu histórico",

                    comando:
                    "CONSULTAR_HISTORICO"
                },

                {
                    texto:
                    "Benefícios",

                    comando:
                    "CONSULTAR_BENEFICIOS"
                }

            ],

            mensagem:
            "Escolha uma opção para continuar."

        };

    },


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

    },


    beneficios: function(lista){

        return {

            titulo:
            "Benefícios Disponíveis",

            beneficios:
            lista,

            mensagem:
            "Lista de benefícios homologados."

        };

    },


    historico: function(lista){

        return {

            titulo:
            "Histórico de Participações",

            historico:
            lista,

            mensagem:
            "Histórico carregado com sucesso."

        };

    },


    acoes: function(lista){

        return {

            titulo:
            "Minhas Ações",

            acoes:
            lista,

            mensagem:
            "Ações do voluntário carregadas."

        };

    }

};
