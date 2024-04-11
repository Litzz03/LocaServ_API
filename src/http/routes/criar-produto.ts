import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function criarProduto(app: FastifyInstance){
    app.post('/criarProduto', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const requestBody = z.object({
                ID_EMPRESA: z.string(),
                DESCRICAO_PRODUTO: z.string(),
                VL_CUSTO: z.number(),
                VL_VENDA: z.number()
            });
    
            const { ID_EMPRESA, DESCRICAO_PRODUTO, VL_CUSTO, VL_VENDA } = requestBody.parse(request.body);
        
            const produtoCriado = await prisma.produto.create({
                data: {
                    ID_EMPRESA,
                    DESCRICAO_PRODUTO,
                    VL_CUSTO,
                    VL_VENDA
                }
            });
    
            return reply.status(201).send(produtoCriado);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return reply.status(500).send({ error: "Erro ao criar produto" });
        }
    });
}
