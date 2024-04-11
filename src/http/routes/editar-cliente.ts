import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editarUsuario(app: FastifyInstance) {
    app.put('/editarUsuario/:id', async (requisicao: FastifyRequest, resposta: FastifyReply) => {
        try {
            const { id } = requisicao.params as { id: string };

            const esquemaDados = z.object({
                EMAIL_USUARIO: z.string(),
                SENHA_USUARIO: z.string()
            });

            const {  EMAIL_USUARIO,SENHA_USUARIO } = esquemaDados.parse(requisicao.body);

            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    EMAIL_USUARIO,
                    SENHA_USUARIO
                }
            });

            return resposta.status(200).send(usuarioAtualizado);
        } catch (error) {
            resposta.status(500).send({ erro: 'Erro Interno do Servidor' });
        }
    });
}
