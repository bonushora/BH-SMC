# BH-SMC SECIS Ledger Proof v1

## Identificação

Projeto:
BH-SMC

Ambiente:
SECIS-PILOTO

Versão:
ledger-proof-v1

Commit:
8ccea75c4efa9b505cc2160fd23bc738b3f71188


## Objetivo

Demonstrar que o saldo de participação cidadã pode ser
reconstituído deterministicamente a partir do histórico de
transações registradas no Ledger.


## Arquitetura de validação

Fonte de verdade:

Ledger de transações


Processo:

Transações
   |
   v
Cálculo determinístico
   |
   v
Reconciliação com carteira
   |
   v
Proof criptográfico SHA-256


## Evidência funcional


Endpoint Auditoria:

GET /api/auditoria/ledger


Resultado esperado:

saldoCarteira =
saldoCalculado

divergencia = 0

status = INTEGRIDADE_OK


## Evidência criptográfica


Endpoint:

GET /api/proof


Versão:

ledger-proof-v1


Hash:

75310f302982d6414541f7f65b79d8850c58417ff8602f9e12011b88bf9e4d4c


## Estado validado


Voluntários:

1


Transações:

2


Saldo total:

35 BH


## Conclusão

O ambiente SECIS-PILOTO possui uma prova determinística
do estado do Ledger no momento da homologação.

