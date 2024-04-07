import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";




export async function criarUsuario(app: FastifyInstance){
    app.post('/criarUsuario', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const requestBody = z.object({
                nome: z.string(),
                email: z.string().email()
            });
    
            const { nome, email } = requestBody.parse(request.body);
        
            const usuarioCriado = await prisma.usuario.create({
                data: {
                    nome,
                    email
                }
            });
    
            return reply.status(201).send(usuarioCriado);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return reply.status(500).send({ error: "Erro ao criar usuário" });
        }
    });


} 