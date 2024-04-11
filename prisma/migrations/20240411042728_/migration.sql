/*
  Warnings:

  - You are about to drop the `USUARIO_SISTEMA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CLIENTE" DROP CONSTRAINT "CLIENTE_ID_USUARIO_fkey";

-- DropForeignKey
ALTER TABLE "VENDEDOR" DROP CONSTRAINT "VENDEDOR_ID_USUARIO_fkey";

-- DropTable
DROP TABLE "USUARIO_SISTEMA";

-- CreateTable
CREATE TABLE "usuario_sistema" (
    "id_usuario" TEXT NOT NULL,
    "login_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,

    CONSTRAINT "usuario_sistema_pkey" PRIMARY KEY ("id_usuario")
);

-- AddForeignKey
ALTER TABLE "VENDEDOR" ADD CONSTRAINT "VENDEDOR_ID_USUARIO_fkey" FOREIGN KEY ("ID_USUARIO") REFERENCES "usuario_sistema"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLIENTE" ADD CONSTRAINT "CLIENTE_ID_USUARIO_fkey" FOREIGN KEY ("ID_USUARIO") REFERENCES "usuario_sistema"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
