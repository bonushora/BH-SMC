# Roteiro de Demonstração
## BônusHora Social - Piloto SECIS Salvador

Versão:
secis-piloto-v0.1

Tempo estimado:
10 minutos

---

# 1. Abertura

## O desafio

A participação cidadã gera valor social, porém muitas vezes esse valor não possui uma camada digital de registro, acompanhamento e reconhecimento.

O desafio é transformar participação em dados verificáveis para apoiar gestão pública e engajamento comunitário.

---

# 2. A proposta BônusHora Social

O BônusHora Social é uma infraestrutura digital para registrar participação cidadã.

Ele permite:

- cadastrar participantes;
- registrar ações;
- validar execuções;
- reconhecer participação;
- disponibilizar indicadores.

O BônusHora não substitui a moeda oficial.

O Real representa valor financeiro.

O BônusHora representa participação social registrada.

---

# 3. Demonstração operacional

## Etapa 1 — Participação

Um cidadão participa de uma ação socioambiental.

O sistema registra:

- participante;
- ação;
- execução;
- horas reconhecidas.

---

## Etapa 2 — Consulta pelo cidadão

Canal:

Chat Soberano

Exemplo:

menu

Resultado:

- Meu saldo;
- Meu histórico;
- Benefícios.

---

## Etapa 3 — Benefícios homologados

Consulta:

beneficios

O participante visualiza benefícios disponíveis.

Exemplos:

- parcerias locais;
- reconhecimento;
- eventos.

---

## Etapa 4 — Resgate

O participante solicita um benefício.

O sistema:

- valida saldo;
- registra transação;
- atualiza ledger;
- gera comprovante.

---

# 4. Visão do gestor público

O gestor acompanha indicadores:

- participantes cadastrados;
- ações realizadas;
- execuções;
- BônusHora emitido;
- BônusHora resgatado;
- saldo circulante.

Painel:

GET /api/bi/metrics

---

# 5. Arquitetura resumida

Fluxo:

Cidadão

↓

Chat / Interface

↓

API BH-SMC

↓

Banco de dados

↓

Ledger operacional

↓

Indicadores BI

---

# 6. Proposta de piloto

O objetivo da próxima fase é validar o uso controlado com participantes reais.

Avaliar:

- adesão;
- participação;
- geração de indicadores;
- valor percebido pela comunidade.

---

# 7. Encerramento

O BônusHora Social cria uma camada digital de reconhecimento da participação cidadã, permitindo medir e acompanhar iniciativas socioambientais.

