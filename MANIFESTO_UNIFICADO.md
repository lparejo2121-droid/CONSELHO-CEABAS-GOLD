# 🛡️ Manifesto Técnico Unificado — Ecossistema CEABAS Core

![Status](https://shields.io)
![Arquitetura](https://shields.io)
![Assinatura GPG](https://shields.io)
![Data de Registro](https://shields.io)

Documento mestre de consolidação técnica entre os módulos de validação blockchain (`Laercio`) e auditoria criptográfica automatizada (`CONSELHO-CEABAS-GOLD`), registrado e verificado na plataforma GitHub.

---

## 📊 1. Arquitetura Consolidada dos Repositórios

| Repositório | Versão Core | Marcador Hex | Stack Principal | Ponto de Entrada / Automação |
| :--- | :---: | :---: | :--- | :--- |
| **`lparejo2121-droid/Laercio`** | `7.8.5` | `0xFFFFFFF00` | Node.js, `ethers.js`, Sepolia Testnet | `src/sepolia-validator.js` |
| **`lparejo2121-droid/CONSELHO-CEABAS-GOLD`** | `v11Q` | `0x51` | Python (`48.5%`), Solidity `0.8.20`, Hardhat `2.22.5`, OpenZeppelin `5.0.1` | `.github/workflows/show-signature.yml` e `validar_ancoras.py` |

---

## 🔐 2. Síntese Hexadecimal & Lastro Criptográfico

Abaixo está o registro em notação hexadecimal (ASCII / UTF-8) que consolida os identificadores técnicos, marcadores de memória e a chave de verificação dos commits na branch `main`:

```text
43 45 41 42 41 53 20 56 34 31 20 26 20 56 31 31
51 20 7C 20 30 78 35 31 20 7C 20 42 35 36 39 30
45 45 45 42 42 39 35 32 31 39 34 20 7C 20 31 38
2D 31 31 2D 32 30 32 36
```

* **Decodificação UTF-8:** `CEABAS V41 & V11Q | 0x51 | B5690EEEBB952194 | 18-11-2026`
* **Marcador Core (`v11Q`):** `56 31 31 51`
* **Máscara de Registro (`0xFFFFFFF00`):** `30 78 46 46 46 46 46 46 46 30 30`

---

## ⚙️ 3. Comandos de Auditoria e Execução Local

### Módulo 1: Validação de Rede e Contratos (`Laercio` & `CONSELHO-CEABAS-GOLD`)
```bash
# Instalar dependências do projeto Node.js / Hardhat
npm install

# Compilar contratos inteligentes (Solidity 0.8.20)
npm run compile

# Executar suíte de testes unitários
npm test

# Rodar validador da rede de testes Sepolia
node src/sepolia-validator.js
```

### Módulo 2: Integridade de Arquivos e Cadeia Git
```bash
# Gerar manifesto de hashes SHA-256 das imagens-âncora
python validar_ancoras.py

# Verificar assinatura criptográfica GPG do último commit
git log -1 --show-signature
```

---

## 📋 4. Metadados de Registro
* **Autor / Engenheiro Responsável:** Laércio Góes Parejo (`lparejo2121-droid`)
* **Formação Base:** Técnico em Eletrônica (UNICID) — Infraestrutura, Redes e Telecomunicações
* **Integridade de Pipeline:** Automatizada via GitHub Actions (`1/1 PASSED`)
