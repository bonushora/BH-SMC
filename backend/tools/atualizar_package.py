from pathlib import Path
import json


ARQUIVO = Path(__file__).resolve().parents[1] / "package.json"


dados = json.loads(
    ARQUIVO.read_text(
        encoding="utf-8"
    )
)


dados["scripts"]["start"] = "node scripts/start.js"
dados["scripts"]["dev"] = "node scripts/start.js"


ARQUIVO.write_text(
    json.dumps(
        dados,
        indent=2
    ) + "\n",
    encoding="utf-8"
)


print("✓ package.json atualizado.")
