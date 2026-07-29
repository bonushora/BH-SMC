-- AlterTable
ALTER TABLE "Acao" ADD COLUMN     "coordenadorId" INTEGER;

-- CreateTable
CREATE TABLE "Coordenador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coordenador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_telefone_key" ON "Coordenador"("telefone");

-- AddForeignKey
ALTER TABLE "Acao" ADD CONSTRAINT "Acao_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Coordenador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
