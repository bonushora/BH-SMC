# BH-SMC — Checklist de Demonstração Institucional v1

Data:
2026-08-04


# Objetivo

Garantir que a demonstração do piloto SECIS seja executada de forma previsível, reproduzível e auditável.


---

# 1. Preparação do Ambiente


## Backend

Verificar:

[ ] API iniciada

[ ] Banco conectado

[ ] Prisma operacional


Teste:

```bash
curl http://localhost:8000/api/dashboard/overview

Resultado esperado:

{
 "status":"operational"
}
2. Dashboard SECIS

Verificar:

[ ] Dashboard iniciado

[ ] Indicadores carregados

[ ] Métricas exibidas

URL local:

http://localhost:5173
3. Fluxo Demonstrativo
Etapa 1 — Coordenador

Demonstrar:

cadastro institucional;
ações disponíveis;
acompanhamento.
Etapa 2 — Participante

Demonstrar:

cidadão registrado;
participação vinculada.
Etapa 3 — Execução

Demonstrar:

atividade criada;
execução registrada;
validação.
Etapa 4 — Ledger Social

Demonstrar:

aprovação;
geração de transação;
atualização de saldo.
Etapa 5 — Indicadores

Demonstrar:

dashboard;
métricas sociais;
auditoria.
4. APIs Demonstradas
Dashboard
GET /api/dashboard/overview
Indicadores SCI
GET /api/sci/metrics
Auditoria
GET /api/auditoria/overview
5. Evidências

Registrar:

[ ] Data da demonstração

[ ] Participantes presentes

[ ] Feedback recebido

[ ] Pontos de evolução

6. Critério de Sucesso

A demonstração será considerada concluída quando:

[OK] Fluxo operacional apresentado

[OK] Indicadores carregados

[OK] Rastreabilidade demonstrada

[OK] Feedback institucional coletado

Status

BH-SMC PILOTO

READY FOR CONTROLLED DEMONSTRATION
