import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editarUsuario(app: FastifyInstance) {
    app.put('/editarUsuario/:id', async (requisicao: FastifyRequest, resposta: FastifyReply) => {
        try {
            const { id } = requisicao.params as { id: string };

            const esquemaDados = z.object({
                nome: z.string(),
                email: z.string().email()
            });

            const { nome, email } = esquemaDados.parse(requisicao.body);

            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    nome,
                    email
                }
            });

            return resposta.status(200).send(usuarioAtualizado);
        } catch (error) {
            resposta.status(500).send({ erro: 'Erro Interno do Servidor' });
        }
    });
}
