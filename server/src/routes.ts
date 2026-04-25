import express from "express";
import { readAllUsers } from "./controllers/UserController";
import {
    createCalcado,
    readAllCalcados,
    updateCalcado,
    deleteCalcado,
    readCalcadosByTamanho,
    readCalcadosByMarca,
    readTotalPares,
} from "./controllers/CalcadosController";

// Funções que construí, elas ficam nos controlelrs.

const routes = express.Router();

// O express que funciona como a biblioteca e arquitetura que ja estava pronta e agora serve como o prédio... Se não fosse isso, tudo seria feito do zero.

routes.get("/users", readAllUsers);
routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);
routes.get("/calcados/tamanho/:tamanho", readCalcadosByTamanho);
routes.get("/calcados/marca/:marca", readCalcadosByMarca);
routes.get("/calcados/estoque/total", readTotalPares);

// Essas são as rotas, por onde o programa se comunica com a outra parte do código para fazê-las dialogar com o banco e com as funções.

export default routes;

// meaning que encontrei do https
// post → criar
// get → buscar
// patch → atualizar
// delete → deletar