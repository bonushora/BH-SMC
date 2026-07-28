require("dotenv").config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const cors = require('cors');
const metricsRoutes = require('./routes/metrics');
const ledgerService = require('./services/ledgerService');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/bi', metricsRoutes(prisma));

// 2. Cadastro de Voluntário
app.post('/api/voluntarios', async (req, res) => {
    try {
        const { numero } = req.body;
        if (!numero) return res.status(400).json({ error: "Número obrigatório." });

        const voluntario = await prisma.voluntario.create({
            data: { numero, saldo: 10 }
        });

        res.json({
            success: true,
            voluntario,
            mensagem: "Voluntário cadastrado com 10 horas iniciais!"
        });

    } catch (error) {
        res.status(400).json({
            error: "Número já cadastrado no sistema."
        });
    }
});

// 3. Motor Central de Transações - Ledger Service
app.post('/api/transacoes', async (req, res) => {
    try {
        const resultado = await ledgerService.processTransaction(
            prisma,
            req.body
        );

        res.json(resultado);

    } catch (error) {

        console.error("ERRO REAL NO LEDGER:", error);

        if (error.status) {
            return res.status(error.status).json(error.payload);
        }

        res.status(500).json({
            error: "Erro ao processar transação no Ledger."
        });
    }
});

// 4. Chat Soberano com Opções Estruturadas para Dispositivos Móveis
app.post('/api/chat/sovereign', async (req, res) => {
    const { message, whatsapp } = req.body;

    try {
        if (!whatsapp) {
            return res.status(400).json({
                error: "Número de WhatsApp obrigatório."
            });
        }

        const voluntario = await prisma.voluntario.findUnique({
            where: { numero: whatsapp }
        });

        if (!voluntario) {
            return res.json({
                response: "Bem-vindo ao Ledger SECIS! Você ainda não está cadastrado.",
                opcoes: ["Cadastrar Agora"]
            });
        }

        return res.json({
            response: `Seu saldo atual é de ${voluntario.saldo} bônus-horas.`,
            opcoes: [
                "Ver Benefícios Disponíveis",
                "Voltar ao Menu"
            ]
        });

    } catch (error) {
        console.error("ERRO REAL NO CHAT:", error);

        return res.status(500).json({
            error: error.message
        });
    }
});

// 5. Módulo de Homologação Integrado
app.post('/api/homologacao/resgate', async (req, res) => {

    const { whatsapp, tipoBeneficio } = req.body;

    if (!whatsapp || !tipoBeneficio) {
        return res.status(400).json({
            success: false,
            error: "Parâmetros 'whatsapp' e 'tipoBeneficio' são obrigatórios."
        });
    }

    try {

        const voluntario = await prisma.voluntario.findUnique({
            where: { numero: whatsapp }
        });

        if (!voluntario) {
            return res.status(404).json({
                success: false,
                error: "Voluntário não encontrado."
            });
        }

        const beneficio = await prisma.beneficio.findFirst({
            where: { tipo: tipoBeneficio }
        });

        if (!beneficio) {
            return res.status(404).json({
                success: false,
                error: "Benefício não homologado."
            });
        }

        if (voluntario.saldo < beneficio.custoHoras) {
            return res.status(400).json({
                success: false,
                error: `Saldo insuficiente. Necessário: ${beneficio.custoHoras}h, Disponível: ${voluntario.saldo}h.`
            });
        }

        const [transacao, voluntarioAtualizado] =
            await prisma.$transaction([

                prisma.transacao.create({
                    data: {
                        voluntarioId: voluntario.id,
                        tipo: "RESGATE",
                        horas: -beneficio.custoHoras,
                        descricao: `Resgate homologado: ${beneficio.titulo}`
                    }
                }),

                prisma.voluntario.update({
                    where: {
                        id: voluntario.id
                    },
                    data: {
                        saldo: {
                            decrement: beneficio.custoHoras
                        }
                    }
                })
            ]);

        const comprovante = {
            protocolo: `SECIS-${transacao.id}-${Date.now().toString().slice(-4)}`,
            beneficiario: voluntario.numero,
            beneficio: beneficio.titulo,
            horasDebitadas: beneficio.custoHoras,
            saldoRestante: voluntarioAtualizado.saldo,
            data: new Date().toISOString(),
            status: "HOMOLOGADO E VALIDADO"
        };

        return res.status(200).json({
            success: true,
            comprovante
        });

    } catch (error) {

        console.error("[HOMOLOGAÇÃO ERROR]", error);

        return res.status(500).json({
            success: false,
            error: "Erro interno no processamento."
        });
    }
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT} com menu interativo móvel e homologação integrados.`);
});
