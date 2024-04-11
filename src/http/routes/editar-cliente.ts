import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function editarCliente(app: FastifyInstance){
    app.put('/editarCliente/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = z.string().parse(request.params);

            const requestBody = z.object({
                ID_USUARIO: z.string().optional(),
                DESCRICAO_USUARIO: z.string().optional(),
                DOCUMENTO_USUARIO: z.string().optional(),
                TELEFONE_USUARIO: z.string().optional()
            }).partial();
    
            const { ID_USUARIO, DESCRICAO_USUARIO, DOCUMENTO_USUARIO, TELEFONE_USUARIO } = requestBody.parse(request.body);
        
            const clienteAtualizado = await prisma.cliente.update({
                where: {
                    ID_CLIENTE: id
                },
                data: {
                    ID_USUARIO,
                    DESCRICAO_USUARIO,
                    DOCUMENTO_USUARIO,
                    TELEFONE_USUARIO
                }
            });
    
            return reply.send(clienteAtualizado);
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
            return reply.status(500).send({ error: "Erro ao editar cliente" });
        }
    });
}
