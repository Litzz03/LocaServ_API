import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function obterEnquete(app: FastifyInstance){

    app.get('/obterEnquete/:enqueteId', async (request, reply) => {

        const obterParametro = z.object({
            enqueteID: z.string().uuid()
        })

        const { enqueteID }= obterParametro.parse(request.params)

        const enquete = await prisma.enquete.findUnique({
            where: {
                codigo: enqueteID
            },
            include: {
                opcoesEnquete : {
                    select : {
                        codigoEnquete : true,
                        descricao: true
                    }
                }
            }
        })

        reply.send(enquete)
    })
}