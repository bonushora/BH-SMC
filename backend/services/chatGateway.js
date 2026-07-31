module.exports = {

    interpretarMensagem: function(payload) {

        return {

            canal:
                payload.canal,

            identificador:
                payload.identificador,

            mensagem:
                payload.mensagem || ""

        };

    }

};

