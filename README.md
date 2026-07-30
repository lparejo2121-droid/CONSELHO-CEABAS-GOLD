# CEABAS v11Q-Enterprise

**Sistema de Governança, Custódia e Oráculos com Auditoria Matemática**

Este repositório contém a suíte completa de contratos inteligentes e ferramentas de auditoria do protocolo CEABAS v11Q.

## 👨‍💻 Lead Engineer
Eng. Laercio Goes Parejo (CREA-SP / Pronatec)

## 📦 Stack Técnica
- **Solidity:** 0.8.26
- **Framework:** Hardhat 2.22.5
- **Segurança:** OpenZeppelin 5.0.2
- **Linguagem Auxiliar:** Python 3.9+

## 🚀 Como Rodar e Auditar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Compilar contratos
npm run compile

# 3. Rodar testes e validar invariantes INV-01, INV-04, INV-09
npm test

# 4. Gerar relatório de cobertura 100%
npm run coverage

# 5. Gerar relatório de auditoria com selo SHA-512
python gerar_relatorio_v11q.py

# 6. Congelar relatório no IPFS para imutabilidade
ipfs add RELATORIO_AUDITORIA_CEABAS_v11Q.txt
