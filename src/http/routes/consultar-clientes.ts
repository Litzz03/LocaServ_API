import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function consultarCliente(app: FastifyInstance){
    app.get('/consultarCliente/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            
            const cliente = await prisma.cliente.findUnique({
                where: {
                    ID_CLIENTE: id
                }
            });

            if (!cliente) {
                return reply.status(404).send({ error: "Cliente não encontrado" });
            }
    
            return reply.send(cliente);
        } catch (error) {
            console.error("Erro ao consultar cliente:", error);
            return reply.status(500).send({ error: "Erro ao consultar cliente" });
        }
    });
}
