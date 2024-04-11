import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function consultarProduto(app: FastifyInstance){
    app.get('/consultarProduto/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = z.string().parse(request.params);
            
            const produto = await prisma.produto.findUnique({
                where: {
                    ID_PRODUTO: id
                }
            });

            if (!produto) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }
    
            return reply.send(produto);
        } catch (error) {
            console.error("Erro ao consultar produto:", error);
            return reply.status(500).send({ error: "Erro ao consultar produto" });
        }
    });
}
