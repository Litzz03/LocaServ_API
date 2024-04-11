import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function editarProduto(app: FastifyInstance){
    app.put('/editarProduto/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = z.string().parse(request.params);

            const requestBody = z.object({
                ID_EMPRESA: z.string().optional(),
                DESCRICAO_PRODUTO: z.string().optional(),
                VL_CUSTO: z.number().optional(),
                VL_VENDA: z.number().optional()
            }).partial();
    
            const { ID_EMPRESA, DESCRICAO_PRODUTO, VL_CUSTO, VL_VENDA } = requestBody.parse(request.body);
        
            const produtoAtualizado = await prisma.produto.update({
                where: {
                    ID_PRODUTO: id
                },
                data: {
                    ID_EMPRESA,
                    DESCRICAO_PRODUTO,
                    VL_CUSTO,
                    VL_VENDA
                }
            });
    
            return reply.send(produtoAtualizado);
        } catch (error) {
            console.error("Erro ao editar produto:", error);
            return reply.status(500).send({ error: "Erro ao editar produto" });
        }
    });
}
