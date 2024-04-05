import { error } from "console";
import { fastify } from "fastify";

const app = fastify();

app.listen({ port: 3000 }, (erro, address) => {
    if (erro) {
    console.error(error)
    process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});