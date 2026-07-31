module.exports = {

    interpretar: function(mensagem) {

        const texto =
            mensagem
                .toLowerCase()
                .trim();


        if (
            texto === "menu" ||
            texto === "inicio" ||
            texto === "início" ||
            texto === "voltar"
        ) {

            return "MENU_PRINCIPAL";

        }


        if (
            texto === "saldo" ||
            texto === "ver saldo"
        ) {

            return "CONSULTAR_SALDO";

        }


        if (
            texto === "dashboard" ||
            texto === "meu dashboard"
        ) {

            return "CONSULTAR_DASHBOARD";

        }


        if (
            texto === "ações" ||
            texto === "acoes" ||
            texto === "minhas ações"
        ) {

            return "CONSULTAR_ACOES";

        }


        if (
            texto === "benefícios" ||
            texto === "beneficios"
        ) {

            return "CONSULTAR_BENEFICIOS";

        }


        if (
            texto === "histórico" ||
            texto === "historico"
        ) {

            return "CONSULTAR_HISTORICO";

        }


        return "MENU_PRINCIPAL";

    }

};
