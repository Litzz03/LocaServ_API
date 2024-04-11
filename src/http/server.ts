import { fastify } from "fastify";
import { criarUsuario } from "./routes/criar-usuario";

const app = fastify()

app.register(criarUsuario)

app.listen({port: 3333}).then( () => {
    console.log('SERVIDOR RODANDO')
})  