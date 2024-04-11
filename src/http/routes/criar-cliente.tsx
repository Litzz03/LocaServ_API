import { FastifyInstance, FastifyReply, FastifyRequest, } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function criarUsuario(app: FastifyInstance){
    app.post('/criarUsuario', async (request: FastifyRequest, reply: FastifyReply) => {
       
            const requestBody = z.object({
                EMAIL_USUARIO: z.string(),
                SENHA_USUARIO: z.string()

            });
    
            const { EMAIL_USUARIO,SENHA_USUARIO } = requestBody.parse(request.body);
        
            const usuarioCriado = await prisma.usuario.create({
                data: {
                
                    EMAIL_USUARIO,
                    SENHA_USUARIO
                }
            });
    
            return reply.status(201).send(usuarioCriado);
        
    });


}