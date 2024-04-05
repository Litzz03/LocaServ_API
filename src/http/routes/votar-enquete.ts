import { FastifyInstance } from "fastify";
import z from "zod";

export async function votarEnquete(app: FastifyInstance){

    app.post('/enquete/:enqueteCodigo/votar', async (request, reple) => {

        const enqueteParametro = z.object({
            enqueteCodigo : z.string().uuid()
        })

        const opcaoEnqueteBody = z.object({
            codigoOpcao : z.string().uuid()
        })

        const { enqueteCodigo } = enqueteParametro.parse(request.params)
        const { codigoOpcao } = opcaoEnqueteBody.parse(request.body)
    })
}