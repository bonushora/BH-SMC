# BH-SDP SECIS EVIDENCE PACK v1

## Projeto

BH-SMC — BônusHora Social Management Core

Ambiente:

SECIS-PILOTO


## Objetivo

Demonstrar uma infraestrutura determinística para registro,
validação e auditoria de participação cidadã utilizando
BônusHoras como unidade de reconhecimento social.


# 1. Estado do Sistema

Branch:

release/secis-piloto


Snapshot:

bh-sdp-secIS-pilot-ready-v1


Commit:

70c9c2d


Status:

PILOTO TECNICAMENTE VALIDADO


# 2. Infraestrutura

Backend:

https://bh-smc.onrender.com


Banco:

PostgreSQL Supabase Cloud


ORM:

Prisma 7.9.1


# 3. Endpoints Públicos


## Health Check

Endpoint:

/api/health


Função:

Validação de disponibilidade do serviço.


Resultado esperado:

database: connected


---


## Ledger Proof

Endpoint:

/api/proof


Função:

Geração de prova do estado atual do ledger.


Informações produzidas:

- quantidade de voluntários;
- quantidade de transações;
- saldo total;
- hash do estado.


---


## Auditoria Ledger

Endpoint:

/api/auditoria/ledger


Função:

Comparação entre saldo armazenado e saldo calculado
a partir das transações.


Resultado atual:

INTEGRIDADE_OK


# 4. Estado Atual do Piloto


Voluntários:

1


Transações:

5


Saldo total:

20 BônusHoras


Integridade:

100%


# 5. Evidências Versionadas


## Cloud Validation

Tag:

bh-sdp-secIS-cloud-validation-v1


## Ledger Reconciliation

Tag:

bh-sdp-secIS-ledger-reconciliation-v1


## Demo

Tag:

bh-sdp-secIS-demo-v1


## Demo Script

Tag:

bh-sdp-secIS-demo-script-v1


## Pilot Ready

Tag:

bh-sdp-secIS-pilot-ready-v1


# 6. Limitações Conhecidas

Este ambiente representa um piloto técnico.

Ainda não representa:

- operação pública;
- escala de usuários;
- integração com sistemas externos;
- governança definitiva.


# 7. Próxima Fase

Execução de piloto controlado:

1. cadastrar participantes reais;
2. registrar ações reais;
3. emitir BônusHoras;
4. validar impacto;
5. gerar relatório final.


## Conclusão

O BH-SMC SECIS-PILOTO possui:

- infraestrutura publicada;
- banco persistente;
- ledger auditável;
- provas versionadas;
- documentação reproduzível.

Estado:

READY FOR CONTROLLED PILOT
