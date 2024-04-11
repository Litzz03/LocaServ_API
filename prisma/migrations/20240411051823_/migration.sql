/*
  Warnings:

  - A unique constraint covering the columns `[login_usuario]` on the table `usuario_sistema` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuario_sistema_login_usuario_key" ON "usuario_sistema"("login_usuario");
