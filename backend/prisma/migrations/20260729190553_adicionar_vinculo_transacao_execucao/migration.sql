-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "execucaoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_execucaoId_fkey" FOREIGN KEY ("execucaoId") REFERENCES "ExecucaoParticipacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
