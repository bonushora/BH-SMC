const express = require("express");

const {
    gerarProof
} = require("../services/ledgerProofService");


module.exports = function(prisma) {


    const router =
        express.Router();


    router.get("/", async(req,res)=>{


        try {


            const proof =
                await gerarProof(prisma);


            return res.json(
                proof
            );


        } catch(error) {


            console.error(
                "ERRO LEDGER PROOF:",
                error
            );


            return res.status(500).json({

                error:
                error.message

            });

        }


    });


    return router;

};
