# BH-SMC SECIS — Ledger Reconciliation Report v1

## Identificação

Projeto:
BH-SMC — BônusHora Social Matching Core

Ambiente:
SECIS-PILOTO

Protocolo:
BH-SDP — Snapshot & Delivery Protocol

Versão:
Ledger Reconciliation v1

Data:
2026-08-02


---

# 1. Objetivo

Registrar a validação de integridade do Ledger do BH-SMC após sincronização com ambiente PostgreSQL Cloud.

O processo verificou se o saldo materializado da carteira correspondia ao histórico de transações registrado.


---

# 2. Estado inicial detectado

Durante a auditoria:

Endpoint:

/api/auditoria/ledger


Resultado inicial:

saldoCarteira:
20


saldoCalculado:
-10


divergencia:
30


status:

DIVERGENCIA_LEDGER


---

# 3. Diagnóstico

A investigação identificou ausência do evento gênese responsável pela criação inicial dos créditos do piloto.


Consulta realizada:


SELECT *
FROM "Transacao"
WHERE tipo='GENESIS';


Resultado:

0 registros


Conclusão:

O saldo materializado preservava o estado final esperado, porém o histórico do Ledger estava incompleto.


---

# 4. Evidência do histórico incompleto

Transações existentes:

BONUS       +5

RESGATE     -5

RESGATE     -5

RESGATE     -5


Saldo calculado:

-10


Saldo esperado:

20


Diferença:

30


---

# 5. Correção aplicada

Foi restaurado o evento gênese:


Tipo:

GENESIS


Horas:

30


Descrição:

Crédito inicial do piloto BônusHora SECIS


Após a inclusão:

GENESIS     +30
BONUS        +5
RESGATE      -5
RESGATE      -5
RESGATE      -5


Saldo Ledger:

20


---

# 6. Resultado da validação

Auditoria final:


saldoCarteira:

20


saldoCalculado:

20


divergencia:

0


status:

INTEGRIDADE_OK


---

# 7. Snapshot BH-SDP

Commit:

c9343b7


Tag:

bh-sdp-secIS-ledger-reconciliation-v1


Artefatos preservados:

- health-after-genesis.json
- proof-after-genesis.json
- auditoria-after-genesis.json
- transacoes-before-genesis.txt
- voluntario-before-genesis.txt


---

# 8. Conclusão

O mecanismo de auditoria do BH-SMC detectou uma inconsistência entre estado materializado e histórico transacional.

Após restauração do evento gênese, o Ledger passou a apresentar integridade verificável.


Resultado:

INTEGRIDADE_OK
