# BH-SMC Piloto — Documento de Homologação v1

Data:
2026-08-04


# 1. Identificação

Projeto:

BH-SMC — Sistema de Monitoramento Cidadão


Ambiente:

Piloto SECIS


Branch:

feature/secis-dashboard-v0.3.0


Estado:

PILOTO OPERACIONAL


---

# 2. Objetivo do Piloto

Validar um modelo digital de acompanhamento de participação cidadã, permitindo registrar:

- cidadãos participantes;
- ações socioambientais;
- execução de atividades;
- validação operacional;
- geração de indicadores sociais.


---

# 3. Fluxo Operacional Validado


Coordenador

↓

Cadastro de Ação

↓

Participação do cidadão

↓

Execução da atividade

↓

Validação

↓

Registro no Ledger

↓

Indicadores no Dashboard SECIS


---

# 4. Estado Atual do Ambiente


## Banco de Dados

PostgreSQL operacional.


## Backend

Responsável por:

- regras de negócio;
- participantes;
- ações;
- execuções;
- transações;
- auditoria.


## Dashboard SECIS

Responsável por:

- visão executiva;
- métricas sociais;
- indicadores SCI;
- acompanhamento institucional.


---

# 5. Indicadores Atuais


| Indicador | Valor |
|---|---:|
| Voluntários cadastrados | 101 |
| Coordenadores | 6 |
| Ações cadastradas | 7 |
| Participações | 193 |
| Execuções | 193 |
| Transações | 3 |


---

# 6. Governança e Auditoria


O piloto utiliza:

- versionamento Git;
- snapshots BH-SDP;
- histórico de evolução;
- validação automatizada Health Check.


Snapshots registrados:

- Baseline 001
- Dashboard Integration 002
- Ledger Service 003
- Health Check 004


---

# 7. Critérios de Homologação


## Técnico

[OK] API operacional

[OK] Banco conectado

[OK] Ledger funcional

[OK] Dashboard integrado


## Operacional

[OK] Cadastro de participantes

[OK] Registro de ações

[OK] Execução monitorada

[OK] Validação de crédito social


---

# 8. Próxima Fase


Evolução para piloto controlado com participação institucional.


Objetivos:

- ampliar usuários;
- validar indicadores reais;
- coletar evidências de impacto;
- preparar demonstração executiva.


---

# Status Final

BH-SMC PILOTO

READY FOR INSTITUTIONAL HOMOLOGATION

