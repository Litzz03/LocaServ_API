/*
  Warnings:

  - The primary key for the `usuario_sistema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_usuario` on the `usuario_sistema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CLIENTE" DROP CONSTRAINT "CLIENTE_ID_USUARIO_fkey";

-- DropForeignKey
ALTER TABLE "VENDEDOR" DROP CONSTRAINT "VENDEDOR_ID_USUARIO_fkey";

-- DropIndex
DROP INDEX "usuario_sistema_login_usuario_key";

-- AlterTable
ALTER TABLE "usuario_sistema" DROP CONSTRAINT "usuario_sistema_pkey",
DROP COLUMN "id_usuario",
ADD CONSTRAINT "usuario_sistema_pkey" PRIMARY KEY ("login_usuario");

-- AddForeignKey
ALTER TABLE "VENDEDOR" ADD CONSTRAINT "VENDEDOR_ID_USUARIO_fkey" FOREIGN KEY ("ID_USUARIO") REFERENCES "usuario_sistema"("login_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLIENTE" ADD CONSTRAINT "CLIENTE_ID_USUARIO_fkey" FOREIGN KEY ("ID_USUARIO") REFERENCES "usuario_sistema"("login_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
