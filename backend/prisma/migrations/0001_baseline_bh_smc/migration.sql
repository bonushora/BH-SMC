-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Voluntario" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voluntario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "voluntarioId" INTEGER NOT NULL,
    "horas" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficio" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "custoHoras" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Beneficio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voluntario_numero_key" ON "Voluntario"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficio_tipo_key" ON "Beneficio"("tipo");

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_voluntarioId_fkey" FOREIGN KEY ("voluntarioId") REFERENCES "Voluntario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

