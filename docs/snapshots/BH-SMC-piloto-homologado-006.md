# BH-SMC Piloto — Homologado Snapshot 006

Data:
2026-08-04

## Marco

Estado consolidado do piloto após homologação técnica e operacional.

## Estado Git

Branch:

feature/secis-dashboard-v0.3.0


Commit base:

e7315e4


## Componentes Validados

Backend:

- API operacional;
- regras de negócio funcionando;
- Prisma conectado;
- PostgreSQL validado;
- Ledger transacional.


Dashboard SECIS:

- visão executiva;
- métricas sociais;
- SCI;
- auditoria.


## Dados do Piloto

| Entidade | Quantidade |
|---|---:|
| Voluntários | 101 |
| Coordenadores | 6 |
| Ações | 7 |
| Participações | 193 |
| Execuções | 193 |
| Transações | 3 |


## Fluxo Validado

Coordenador

↓

Ação

↓

Participação

↓

Execução

↓

Aprovação

↓

Ledger

↓

Indicadores Dashboard


## Governança

Utilizados:

- Git;
- snapshots BH-SDP;
- histórico versionado;
- Health Check automatizado.


## Status

READY FOR INSTITUTIONAL DEMONSTRATION

