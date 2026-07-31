module.exports = {

    interpretarMensagem: function(payload) {

        const mensagem =
            (payload.mensagem || "")
                .toLowerCase()
                .trim();


        let comando = "MENU_PRINCIPAL";


        if (
            mensagem === "saldo" ||
            mensagem === "ver saldo"
        ) {

            comando = "CONSULTAR_SALDO";

        }


        else if (
            mensagem === "dashboard" ||
            mensagem === "painel" ||
            mensagem === "meu painel"
        ) {

            comando = "CONSULTAR_DASHBOARD";

        }


        else if (
            mensagem === "beneficios" ||
            mensagem === "benefícios" ||
            mensagem === "ver beneficios"
        ) {

            comando = "LISTAR_BENEFICIOS";

        }


        else if (
            mensagem === "resgatar" ||
            mensagem === "resgatar beneficio" ||
            mensagem === "resgatar benefício"
        ) {

            comando = "RESGATAR_BENEFICIO";

        }


        return {

            comando,

            numero:
                payload.identificador,

            canal:
                payload.canal

        };

    }

};

