# BH-SDP 002 - Arquitetura Atual BH-SMC

Data:
27/07/2026

Estado:
Ledger SECIS homologado

## Stack

Backend:
- Node.js
- Express
- Prisma ORM
- PostgreSQL

## Modelos

### Voluntario
- Identificação por número
- Saldo em bônus-horas
- Histórico de transações

### Transacao
- Entrada e saída de horas
- Auditoria temporal
- Relação com voluntário

### Beneficio
- Catálogo de benefícios
- Custo em horas

## Endpoints atuais

GET:
- /api/bi/metrics

POST:
- /api/voluntarios
- /api/transacoes
- /api/chat/sovereign
- /api/homologacao/resgate

## Fluxo homologado

Cadastro:
Voluntário
↓
Crédito inicial 10 horas

Resgate:
Voluntário
↓
Escolhe benefício
↓
Débito no Ledger
↓
Comprovante SECIS

## Próxima etapa

Modularização da API mantendo:
- mesmos endpoints
- mesmo banco
- mesmo comportamento
