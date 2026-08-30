// check-blockchain.js - Pericia de Conexao Sepolia - v11Q FINAL
const { ethers } = require("ethers");

async function main() {
  console.log("=== INICIANDO PROTOCOLO DE VERIFICACAO SEPOLIA ===");
  
  if (!process.env.SEPOLIA_RPC_URL || !process.env.PRIVATE_KEY) {
    console.error("[ERRO] SECRETS nao configurados!");
    process.exit(1);
  }

  // PATCH: staticNetwork = true mata o erro JsonRpcProvider failed to detect network
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL,
    11155111,
    { staticNetwork: true }
  );

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

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
