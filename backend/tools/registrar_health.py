from pathlib import Path

arquivo = Path("routes/index.js")

codigo = arquivo.read_text(encoding="utf-8")

if "const healthRoute = require('./health');" not in codigo:
    codigo = codigo.replace(
        "const coordenadoresRoute = require('./coordenadores');",
        "const coordenadoresRoute = require('./coordenadores');\nconst healthRoute = require('./health');"
    )

if "router.use(\n        '/health'," not in codigo:
    codigo = codigo.replace(
        "return router;",
        """
    router.use(
        '/health',
        healthRoute(prisma)
    );


    return router;
"""
    )

arquivo.write_text(codigo, encoding="utf-8")

print("✓ Rota health registrada.")
