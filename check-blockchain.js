// check-blockchain.js - Pericia de Conexao Sepolia - v12 FORENSICA
const { ethers } = require("ethers");

async function main() {
  console.log("=== INICIANDO PROTOCOLO DE VERIFICACAO SEPOLIA ===");
  
  if (!process.env.SEPOLIA_RPC_URL || !process.env.PRIVATE_KEY) {
    console.error("[ERRO] SECRETS nao configurados!");
    process.exit(1);
  }

  // ============================================
  // BLOCO 1: INSPEÇÃO CIRÚRGICA - SEM VAZAMENTO
  // ============================================
  let privateKey = process.env.PRIVATE_KEY;

  // Remove espaços, aspas ou quebras de linha
  privateKey = privateKey.trim().replace(/^["']|["']$/g, '');

  console.log(`[DEBUG] Comprimento bruto após limpeza: ${privateKey.length} caracteres`);
  
  // Exibe apenas contorno (primeiros 4 e últimos 4) para detectar 0x0x ou truncamento
  const firstFour = privateKey.substring(0, 4);
  const lastFour = privateKey.slice(-4);
  console.log(`[DEBUG] Contorno: ${firstFour}...${lastFour}`);

  // Garante a formatação Hexadecimal com prefixo 0x
  if (!privateKey.startsWith("0x")) {
    privateKey = `0x${privateKey}`;
    console.log(`[DEBUG] Prefixo 0x adicionado. Novo comprimento: ${privateKey.length}`);
  }

  // ============================================
  // BLOCO 2: VALIDAÇÃO RIGOROSA
  // ============================================
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    const hexPart = privateKey.slice(2);
    const invalidChars = hexPart.match(/[^0-9a-fA-F]/g);
    
    console.error(`
[ERRO CRÍTICO] PRIVATE_KEY inválido:
  • Comprimento total: ${privateKey.length} caracteres (esperado: 66 com 0x)
  • Comprimento hex (sem 0x): ${hexPart.length} caracteres (esperado: 64)
  • Caracteres inválidos encontrados: ${invalidChars ? invalidChars.join(', ') : 'nenhum detectado'}
  • Contorno da chave: ${firstFour}...${lastFour}
  • Formato esperado: 0x[64 caracteres hexadecimais 0-9a-f]

Possíveis causas:
  1. Secret foi copiado com espaços/quebras de linha em GitHub Settings
  2. Secret é 63 ou 65 caracteres (erro ao copiar/colar)
  3. Secret contém duplicação de prefixo (0x0x...)
  4. Secret contém caracteres especiais ou inválidos
    `);
    process.exit(1);
  }

  console.log('[DEBUG] ✓ PRIVATE_KEY validado com sucesso (formato hex 64-char)');

  // ============================================
  // BLOCO 3: CONEXÃO BLOCKCHAIN
  // ============================================
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL,
    11155111,
    { staticNetwork: true }
  );

  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`NÓ 02 Signer: ${wallet.address}`);

  const start = Date.now();
  const blockNumber = await provider.getBlockNumber();
  const latency = Date.now() - start;

  console.log(`Bloco Atual Sepolia: ${blockNumber}`);
  console.log(`Latencia RPC Alchemy: ${latency}ms`);

  if (latency > 12) {
    console.error(`[FALHA] Latencia ${latency}ms acima do disjuntor de 12ms`);
    process.exit(1);
  }

  const balance = await provider.getBalance(wallet.address);
  console.log(`Saldo: ${ethers.formatEther(balance)} ETH`);

  console.log("[OK] Conexao Sepolia validada! Disjuntor: VERDE");
  console.log("=== PROTOCOLO CRISTALIZADO - PLANTA 1 R$7.5M ===");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});