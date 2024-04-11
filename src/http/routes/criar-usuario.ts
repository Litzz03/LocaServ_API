import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function criarUsuario(app: FastifyInstance) {
    
    app.post('/criarUsuario', async (request, reply) => {
    
        const requestBody = z.object(
            {
                login_usuario : z.string  (),
                senha_usuario : z.string  (),
                email_usuario : z.string  ()
            }
        );

        const { login_usuario, senha_usuario, email_usuario} = requestBody.parse(request.body);

        const validarUsuario = await prisma.usuario_sistema.findUnique({
            where: {
                login_usuario: login_usuario
            }
        });

        if (validarUsuario) {
            return reply.status(400).send({ error: "Usuário já existe" });
        }

        const usuarioCriado = await prisma.usuario_sistema.create({
            data: {
                login_usuario,
                senha_usuario,
                email_usuario
            }
        });
        return reply.status(201).send(usuarioCriado);
    })
}