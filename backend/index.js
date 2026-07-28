require("dotenv").config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const cors = require('cors');

const routes = require('./routes');

const ledgerService = require('./services/ledgerService');
const homologacaoService = require('./services/homologacaoService');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes(prisma));



// 3. Motor Central de Transações - Ledger Service
app.post('/api/transacoes', async (req, res) => {

    try {

        const resultado =
            await ledgerService.processTransaction(
                prisma,
                req.body
            );


        res.json(resultado);


    } catch (error) {

        console.error("ERRO REAL NO LEDGER:", error);


        if (error.status) {

            return res
                .status(error.status)
                .json(error.payload);

        }


        res.status(500).json({
            error: "Erro ao processar transação no Ledger."
        });

    }

});


// 4. Chat Sovereign extraído para routes/chat.js

// 5. Homologação - Homologation Service
app.post('/api/homologacao/resgate', async (req, res) => {

    try {

        const resultado =
            await homologacaoService.processResgate(
                prisma,
                req.body
            );


        return res.json(resultado);


    } catch(error) {

        console.error(
            "[HOMOLOGAÇÃO ERROR]",
            error
        );


        if (error.status) {

            return res
                .status(error.status)
                .json(error.payload);

        }


        return res.status(500).json({

            success:false,

            error:
            "Erro interno no processamento."

        });

    }

});


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {

    console.log(
        `🚀 Servidor rodando na porta ${PORT} com menu interativo móvel e homologação integrados.`
    );

});
