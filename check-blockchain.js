const { ethers } = require("ethers");

async function main() {

  
  
  const provider = new ethers.JsonRpcProvider("https://ankr.com");
    const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

    console.log(`Conectando à rede Sepolia...`);
    console.log(`Verificando o endereço: ${walletAddress}\n`);

    try {
        const balance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.formatEther(balance);

        console.log(`=== CONEXÃO BEM-SUCEDIDA ===`);
        console.log(`Saldo Atualizado: ${balanceInEth} Sepolia ETH`);
    } catch (error) {
        console.error("Erro ao conectar à blockchain:", error);
    }
}

main();
