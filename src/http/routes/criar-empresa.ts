import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function criarEmpresa(app: FastifyInstance){
    app.post('/criarEmpresa', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const requestBody = z.object({
                DESCRICAO_EMPRESA: z.string(),
                DOCUMENTO_EMPRESA: z.string()
            });
    
            const { DESCRICAO_EMPRESA, DOCUMENTO_EMPRESA } = requestBody.parse(request.body);
        
            const empresaCriada = await prisma.empresa.create({
                data: {
                    DESCRICAO_EMPRESA,
                    DOCUMENTO_EMPRESA
                }
            });
    
            return reply.status(201).send(empresaCriada);
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
            return reply.status(500).send({ error: "Erro ao criar empresa" });
        }
    });
}