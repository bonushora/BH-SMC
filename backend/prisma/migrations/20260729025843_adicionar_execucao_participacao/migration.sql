-- CreateTable
CREATE TABLE "ExecucaoParticipacao" (
    "id" SERIAL NOT NULL,
    "participacaoId" INTEGER NOT NULL,
    "checkinEm" TIMESTAMP(3),
    "checkoutEm" TIMESTAMP(3),
    "horasRealizadas" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'INICIADA',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecucaoParticipacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExecucaoParticipacao_participacaoId_key" ON "ExecucaoParticipacao"("participacaoId");

-- AddForeignKey
ALTER TABLE "ExecucaoParticipacao" ADD CONSTRAINT "ExecucaoParticipacao_participacaoId_fkey" FOREIGN KEY ("participacaoId") REFERENCES "Participacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
