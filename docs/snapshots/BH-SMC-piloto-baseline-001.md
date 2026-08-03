# BH-SMC Piloto — Baseline Snapshot 001

Data:
2026-08-03

## Estado Git

Repositório:

BH-SMC

Branch:

feature/secis-dashboard-v0.3.0

Commit atual:

d604858

Tag:

bh-sdp-secIS-dashboard-start-v030


## Estado Operacional

O BH-SMC Piloto inicia evolução independente do MVP BônusHora de apresentação.

Princípio:

Preservar o produto demonstrável enquanto o piloto evolui como ambiente controlado de validação.


## Banco de Dados

Conexão validada:

PostgreSQL local via Supabase

DATABASE_URL:

postgresql://supabase_admin:postgres@localhost:54322/postgres


## Estado das Entidades

| Entidade | Quantidade |
|---|---:|
| Voluntários | 1 |
| Coordenadores | 1 |
| Ações | 1 |
| Participações | 1 |
| Execuções | 1 |
| Transações | 2 |


## Fluxo Validado

Coordenador

↓

Ação

↓

Participação

↓

Execução

↓

Ledger

↓

Transação


## Arquitetura Atual

### Backend

Responsável por:

- regras operacionais;
- participantes;
- ações;
- execuções;
- ledger;
- homologação.


### Dashboard SECIS

Responsável por:

- métricas;
- visão executiva;
- auditoria;
- indicadores SCI.


### Governança

Responsável por:

- snapshots;
- histórico;
- preservação de contexto.


## Capacidades Confirmadas

- API operacional;
- Prisma conectado;
- PostgreSQL validado;
- Ledger funcional;
- Dashboard conectado;
- Auditoria disponível.


## Próxima Fase

BH-SMC Piloto v0.1

Objetivo:

Evolução controlada da operação piloto sem impacto no MVP demonstrável.


## Restrições

Não:

- misturar código do MVP;
- alterar fluxos estáveis;
- remover histórico;
- executar refatorações amplas sem snapshot.


## Status

READY FOR PILOT DEVELOPMENT

