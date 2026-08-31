// check-blockchain.js - Pericia de Conexao Sepolia - v13 BLINDAGEM ANTI-0x0x
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
  let rawKey = (process.env.PRIVATE_KEY || '').trim().replace(/['"\s\n\r]/g, '').toLowerCase();

  console.log(`[DEBUG] Tamanho bruto: ${rawKey.length} caracteres`);

  // ============================================
  // BLOCO 2: BLINDAGEM ANTI-0x0x E FORMATAÇÃO
  // ============================================
  if (rawKey.startsWith('0x0x')) {
    console.log(`[DEBUG] Detectado 0x0x duplicado! Corrigindo...`);
    rawKey = rawKey.replace('0x0x', '0x');
  }
  if (!rawKey.startsWith('0x')) {
    rawKey = '0x' + rawKey;
  }
  const privateKey = rawKey;

  console.log(`[DEBUG] Tamanho: ${privateKey.length} (tem que ser 66)`);
  console.log(`[DEBUG] Preview: ${privateKey.slice(0, 6)}...${privateKey.slice(-4)}`);

  // ============================================
  // BLOCO 3: VALIDAÇÃO RIGOROSA
  // ============================================
  if (!/^0x[0-9a-f]{64}$/.test(privateKey)) {
    const hexPart = privateKey.slice(2);
    const invalidChars = hexPart.match(/[^0-9a-f]/g);
    
    console.error(`
[ERRO CRÍTICO] PRIVATE_KEY inválido:
  • Comprimento total: ${privateKey.length} caracteres (esperado: 66 com 0x)
  • Comprimento hex (sem 0x): ${hexPart.length} caracteres (esperado: 64)
  • Caracteres inválidos encontrados: ${invalidChars ? invalidChars.join(', ') : 'nenhum detectado'}
  • Preview da chave: ${privateKey.slice(0, 6)}...${privateKey.slice(-4)}
  • Formato esperado: 0x[64 caracteres hexadecimais 0-9a-f]

Possíveis causas:
  1. Secret foi copiado com espaços/quebras de linha em GitHub Settings
  2. Secret é 63 ou 65 caracteres (erro ao copiar/colar)
  3. Secret contém duplicação de prefixo (0x0x...) - CORRIGIDO AUTOMATICAMENTE
  4. Secret contém caracteres especiais ou inválidos
    `);
    process.exit(1);
  }

  console.log('[DEBUG] ✓ PRIVATE_KEY validado com sucesso (formato hex 64-char)');

  // ============================================
  // BLOCO 4: CONEXÃO BLOCKCHAIN
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
