-- CreateTable
CREATE TABLE "VotacaoEnquete" (
    "codigoVotacao" SERIAL NOT NULL,
    "dataVotacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,
    "enqueteCodigo" TEXT NOT NULL,
    "opcaoEnqueteCodigoEnquete" TEXT NOT NULL,

    CONSTRAINT "VotacaoEnquete_pkey" PRIMARY KEY ("codigoVotacao")
);

-- AddForeignKey
ALTER TABLE "VotacaoEnquete" ADD CONSTRAINT "VotacaoEnquete_enqueteCodigo_fkey" FOREIGN KEY ("enqueteCodigo") REFERENCES "Enquete"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VotacaoEnquete" ADD CONSTRAINT "VotacaoEnquete_opcaoEnqueteCodigoEnquete_fkey" FOREIGN KEY ("opcaoEnqueteCodigoEnquete") REFERENCES "OpcaoEnquete"("codigoEnquete") ON DELETE RESTRICT ON UPDATE CASCADE;
