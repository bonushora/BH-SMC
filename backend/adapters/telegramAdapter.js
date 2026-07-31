module.exports = {

    receberMensagem: function(payload) {

        return {

            canal: "telegram",

            identificador:
                payload.usuario,

            mensagem:
                payload.mensagem

        };

    }

};
