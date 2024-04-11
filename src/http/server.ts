import { fastify } from "fastify";
import { criarUsuario } from "./routes/criar-usuario";
import { consultarProduto } from "./routes/consulta-produtos";
import { consultarCliente } from "./routes/consultar-clientes";
import { consultarEmpresa } from "./routes/consultar-empresa";
import { criarCliente } from "./routes/criar-cliente";
import { criarEmpresa } from "./routes/criar-empresa";
import { criarProduto } from "./routes/criar-produto";
import { editarCliente } from "./routes/editar-cliente";
import { editarEmpresa } from "./routes/editar-empresa";
import { editarProduto } from "./routes/editar-produtos";
import { excluirProduto } from "./routes/excluir-produtos";

const app = fastify()

app.register(consultarProduto);
app.register(consultarCliente);
app.register(consultarEmpresa);
app.register(criarCliente);
app.register(criarEmpresa);
app.register(criarProduto);
app.register(criarUsuario);
app.register(editarCliente);
app.register(editarEmpresa);
app.register(editarProduto);
app.register(excluirProduto);

app.listen({port: 3333}).then( () => {
    console.log('SERVIDOR RODANDO')
})  