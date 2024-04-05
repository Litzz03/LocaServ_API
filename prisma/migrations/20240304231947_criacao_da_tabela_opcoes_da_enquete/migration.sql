-- CreateTable
CREATE TABLE "OpcaoEnquete" (
    "codigoEnquete" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "enqueteCodigo" TEXT NOT NULL,

    CONSTRAINT "OpcaoEnquete_pkey" PRIMARY KEY ("codigoEnquete")
);

-- AddForeignKey
ALTER TABLE "OpcaoEnquete" ADD CONSTRAINT "OpcaoEnquete_enqueteCodigo_fkey" FOREIGN KEY ("enqueteCodigo") REFERENCES "Enquete"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
