# BônusHora Social (BH-SMC)
## Piloto SECIS Salvador

Versão:
secis-piloto-v0.1

Status:
MVP congelado para demonstração operacional.

---

## Objetivo

O BônusHora Social é um sistema de reconhecimento e incentivo à participação cidadã em ações socioambientais.

O piloto permite:

- registrar voluntários;
- registrar ações;
- contabilizar participações;
- gerar saldo BônusHora;
- consultar histórico;
- disponibilizar benefícios homologados;
- realizar resgates validados;
- gerar indicadores operacionais.

---

## Componentes validados

### Backend

Estado:
OPERACIONAL

Serviço:
BH-SMC

Versão:
v0.2.0-mvp

---

## APIs homologadas

Health Check:

GET /api/health


Indicadores BI:

GET /api/bi/metrics


Chat Soberano:

POST /api/chat/sovereign


Homologação de benefício:

POST /api/homologacao/resgate

---

## Fluxo demonstrado

Voluntário participa de ação.

↓

Participação registrada.

↓

BônusHora contabilizado.

↓

Voluntário consulta saldo.

↓

Benefícios disponíveis são apresentados.

↓

Resgate homologado gera comprovante.

---

## Indicadores atuais do ambiente piloto

Modelo validado:

- voluntários cadastrados;
- ações cadastradas;
- participações registradas;
- execuções registradas;
- benefícios homologados;
- transações auditáveis.

---

## Próxima fase

Evolução para piloto controlado SECIS Salvador.

