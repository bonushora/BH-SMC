const router = require('express').Router();

const chatController =
    require('../controllers/chatController');


module.exports = function(prisma) {


    router.post(
        '/webhook',
        async (req, res) => {

            const telegramMessage =
                req.body.message || {};


            const identificador =
                telegramMessage.chat?.id;


            const mensagem =
                telegramMessage.text || "";


            req.body = {

                canal: "telegram",

                identificador:
                    String(identificador),

                mensagem

            };


            return chatController(prisma)(
                req,
                res
            );

        }
    );


    return router;

};
