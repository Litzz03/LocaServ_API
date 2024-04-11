import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function criarCliente(app: FastifyInstance){
    app.post('/criarCliente', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const requestBody = z.object({
                ID_USUARIO: z.string(),
                DESCRICAO_USUARIO: z.string(),
                DOCUMENTO_USUARIO: z.string(),
                TELEFONE_USUARIO: z.string()
            });
    
            const { ID_USUARIO, DESCRICAO_USUARIO, DOCUMENTO_USUARIO, TELEFONE_USUARIO } = requestBody.parse(request.body);
        
            const clienteCriado = await prisma.cliente.create({
                data: {
                    ID_USUARIO,
                    DESCRICAO_USUARIO,
                    DOCUMENTO_USUARIO,
                    TELEFONE_USUARIO
                }
            });
    
            return reply.status(201).send(clienteCriado);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            return reply.status(500).send({ error: "Erro ao criar cliente" });
        }
    });
}
