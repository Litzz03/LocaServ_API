import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function excluirProduto(app: FastifyInstance){
    app.delete('/excluirProduto/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            
            const produto = await prisma.produto.delete({
                where: {
                    ID_PRODUTO: id
                }
            });

            return reply.send(produto);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            return reply.status(500).send({ error: "Erro ao excluir produto" });
        }
    });
}
