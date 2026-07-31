# Arquitetura BônusHora Social
## Piloto SECIS Salvador

Versão:
secis-piloto-v0.1

---

## Visão geral

O BH-SMC é organizado como um sistema de registro, validação e rastreabilidade de participação cidadã.

A arquitetura separa:

- camada de interação;
- camada de processamento;
- camada de dados;
- camada de auditoria.

---

## Componentes

### 1. Interface de interação

Canais:

- WhatsApp;
- Telegram;
- interfaces móveis futuras.

Responsável por:

- consultas;
- comandos;
- interação com voluntários.

---

### 2. Chat Soberano

Endpoint:

POST /api/chat/sovereign

Responsável por:

- interpretar comandos;
- consultar saldo;
- consultar ações;
- consultar benefícios;
- apresentar histórico.

---

### 3. Núcleo operacional

Backend BH-SMC.

Responsável por:

- voluntários;
- ações;
- participações;
- execuções;
- transações;
- homologações.

---

### 4. Ledger operacional

Registra:

- créditos BônusHora;
- débitos de resgate;
- histórico de movimentações.

---

### 5. BI Operacional

Endpoint:

GET /api/bi/metrics

Indicadores:

- participantes;
- ações;
- execuções;
- benefícios;
- saldo circulante;
- movimentações.

---

## Princípio do piloto

O BônusHora mede participação social registrada.

O sistema não substitui moeda oficial.

O Real continua representando valor financeiro.

O BônusHora representa reconhecimento e participação cidadã.

