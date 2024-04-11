import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function editarEmpresa(app: FastifyInstance){
    app.put('/editarEmpresa/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = z.string().parse(request.params);

            const requestBody = z.object({
                DESCRICAO_EMPRESA: z.string(),
                DOCUMENTO_EMPRESA: z.string()
            });
    
            const { DESCRICAO_EMPRESA, DOCUMENTO_EMPRESA } = requestBody.parse(request.body);
        
            const empresaAtualizada = await prisma.empresa.update({
                where: {
                    ID_EMPRESA: id
                },
                data: {
                    DESCRICAO_EMPRESA,
                    DOCUMENTO_EMPRESA
                }
            });
    
            return reply.send(empresaAtualizada);
        } catch (error) {
            console.error("Erro ao editar empresa:", error);
            return reply.status(500).send({ error: "Erro ao editar empresa" });
        }
    });
}
