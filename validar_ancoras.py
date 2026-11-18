import hashlib
import json
import os
from datetime import datetime, timezone

PASTA_IMAGENS = "imagens-ancora"
ARQUIVO_MANIFESTO = "anchor.json"


def calcular_sha256(caminho_arquivo: str) -> str:
    sha256 = hashlib.sha256()
    with open(caminho_arquivo, "rb") as f:
        for bloco in iter(lambda: f.read(8192), b""):
            sha256.update(bloco)
    return sha256.hexdigest()


def gerar_manifesto() -> dict:
    registros = []
    if not os.path.exists(PASTA_IMAGENS):
        os.makedirs(PASTA_IMAGENS)

    for nome in sorted(os.listdir(PASTA_IMAGENS)):
        caminho = os.path.join(PASTA_IMAGENS, nome)
        if os.path.isfile(caminho):
            registros.append({
                "arquivo": nome,
                "sha256": calcular_sha256(caminho)
            })

    manifesto = {
        "gerado_em_utc": datetime.now(timezone.utc).isoformat(),
        "total_arquivos": len(registros),
        "ancoras": registros
    }

    with open(ARQUIVO_MANIFESTO, "w", encoding="utf-8") as f:
        json.dump(manifesto, f, indent=2, ensure_ascii=False)

    return manifesto


if __name__ == "__main__":
    resultado = gerar_manifesto()
    print(f"Manifesto atualizado com {resultado['total_arquivos']} arquivo(s).")
