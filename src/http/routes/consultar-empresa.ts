import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function consultarEmpresa(app: FastifyInstance){
    app.get('/consultarEmpresa/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            
            const empresa = await prisma.empresa.findUnique({
                where: {
                    ID_EMPRESA: id
                }
            });

            if (!empresa) {
                return reply.status(404).send({ error: "Empresa não encontrada" });
            }
    
            return reply.send(empresa);
        } catch (error) {
            console.error("Erro ao consultar empresa:", error);
            return reply.status(500).send({ error: "Erro ao consultar empresa" });
        }
    });
}