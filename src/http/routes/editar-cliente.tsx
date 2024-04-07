import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editarUsuario(app: FastifyInstance) {
    app.put('/editarUsuario/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };

            const requestBody = z.object({
                nome: z.string(),
                email: z.string().email()
            });

            const { nome, email } = requestBody.parse(request.body);

            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    nome,
                    email
                }
            });

            return reply.status(200).send(usuarioAtualizado);
        } catch (error) {
            reply.status(500).send({ error: 'Erro Interno do Servidor' });
        }
    });
}
