-- CreateTable
CREATE TABLE "Acao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valorBonusHora" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participacao" (
    "id" SERIAL NOT NULL,
    "voluntarioId" INTEGER NOT NULL,
    "acaoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprovadoEm" TIMESTAMP(3),

    CONSTRAINT "Participacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_voluntarioId_fkey" FOREIGN KEY ("voluntarioId") REFERENCES "Voluntario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_acaoId_fkey" FOREIGN KEY ("acaoId") REFERENCES "Acao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
