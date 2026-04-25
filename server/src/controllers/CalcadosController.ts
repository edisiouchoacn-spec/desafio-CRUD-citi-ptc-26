// Utilizei o Claude para entender a sintaxe do TS.
// Eu não tinha experiência com a mesma. Vou detalhar de forma elabrada cada uso de IA e demonstrar que entendi o processo acima de tudo.
// Como quero ser transparente e realmente aprender, vou deixar isso cheio de comentários para sinalizar como pensei cada passo.
// Dito isso, utilizei a mesma como forma de compreender a lógica das funções também: A IA foi meu guia ativo de aprendizado.


import { Request, Response } from "express";
import prisma from "@database";
import { getCalcadosByTamanho, getCalcadosByMarca, contarTotalPares } from "../repositorie/CalcadosRepositorie";

// Request representa a requisição, o que estou pedindo ao servidor, nesse caso, dados, parametros e etc.
// Ja Response é o que a biblioteca envia de volta para nós, dados ou algum erro.
// E claro, express é o Framework (funciona como uma biblioteca.)

// Para a linha seguinte de import, o prisma é como se fosse um tradutor de comandos de TS para o banco de dados. Foi isso que entendi, ao menos.

export const createCalcado = async (req: Request, res: Response) => {   

    // Criamos uma função e vamos exportar ela (Exportar é permitir que ela seja usada em outros arquivos.)
    // Ja a questão de ser async é pelo sólido motivo de fazê-la esperar, Ela é assincrona, isso faz com que o banco de dados espere antes de dar uma resposta.
    // Resumindo: "Cria e exporta uma função chamada createCalcado, que recebe uma requisição com dados e devolve uma resposta.

    try{
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;
        
        const calcado = await prisma.calcado.create ({

            data: {
                nome_produto, 
                cor, 
                marca, 
                tamanho, 
                preco, 
                quantidade_em_estoque
            },
        });

        return res.status(201).json({
            message: "Suscesso ao cadastrar calçado",
            calcado,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao cadastrar calçado",
            error,
        });
    }
    // O try e catch são conhecidos, vi eles no python como try e except. A lógica é simples, tente isso, se der errado e problema, então tente isso!
    // Isso é uma proteção, se esse script roda com frequência como um serviço, a falta dessa segurança pode causar problemas como:
    // A queda completa do servidor, isso porque o erro faria o código parar de rodar deixando ele temporariamente off.

    // O try;
        // Na primeira linha estamos criando uma constante que vai armazenar o resultado da chamada de req.body.
        // Inclusive, o body é uma estrutura de dados da internet chamada Json, enviada por um caminho/rota do protocolo HTTP.
        // O Express tem um middleware chamado express.json() que converte automaticamente o texto JSON em um objeto JavaScript. É por isso que conseguimos fazer.
        // Agora req.body é um objeto JavaScript normal, e a gente separa cada campo em uma variável.

        // O Prisma é o tradutor de Type Script para SQL, que nesse momento insere no banco de dados a reqisição de calçados.
        // Depois descobri que ele era um Object Relational Mapper, Um, em poucas palavras, tradutor.
        // A função faz exatamente o que se espera que fizesse, cria o objeto da requisição no banco.

    // O catch;
        // Por outro lado, o catch cria um status de erro caso exista alguma falha durante o processo. Seja queda de conexão ou banco de dados fora do ar.
        // O que acontece nesse ponto é a disparada da flag sinalizando qual foi o erro e a continuidade do script.



};

// A função seguinte usa a mesma estrutura, vou poupar o seu tempo de ler novamente todas as explicações... (O raciocínio é semelhante.)

export const readAllCalcados = async (req: Request, res: Response) => {

    try{
        const calcados = await prisma.calcado.findMany();


        return res.status(200).json({
            message: "Suscesso ao ler calçado",
            calcados,
    });

    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao ler calçado",
            error,

        });
    }
// Erro 200 é para busca de algo existente, o erro 201 para algo criado.
// Mesmo para os sucessos.
}

// Essa função tem estrutura semelhante e serve para atualizar calçados cadastrados.
// Ela envia, no mesmo estilo do create, mas aqui, a situação é um pouco diferente. Nesse caso, ela procura por um id, 

export const updateCalcado = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;


        // Lógica semelhante, embora, nesse caso, utilizamos o id que foi criado pelo banco de dados para recolher o objeto que buscamos.
        // A alteração então acontece em um slot associado ao banco de dados.

        const calcado = await prisma.calcado.update({
            where: { id: Number(id) },
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque,
            },
        });

        // Number() para transforrmar em numero ja que ele vem como uma string. nesse caso, também sinalizamos que "onde estiver" nos convertemos para os novos dados.
        // O await, parecido com o async, funciona como um tipo de barreira que faz o código esperar.
        
        return res.status(200).json({
            message: "Calçado atualizado com sucesso.",
            calcado,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar calçado.",
            error,
        });
    }
// Isso eu ja expliquei, erros e constinuidade de código.
};



export const deleteCalcado = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        await prisma.calcado.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            message: "Calçado removido com sucesso.",
        });

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao remover calçado.",
            error,
        });
    }

};

// Eu repeti o processo, na mesma linha de raciocínio, a tese aqui é justamente fazer aquela segurança e operação das funções.
export const readCalcadosByTamanho = async (req: Request, res: Response) => {
    try {
        const { tamanho } = req.params;
        const calcados = await getCalcadosByTamanho(Number(tamanho));

        return res.status(200).json(calcados);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados por tamanho.",
            error,
        });
    }
};

export const readCalcadosByMarca = async (req: Request, res: Response) => {
    try {
        const { marca } = req.params;
        const calcados = await getCalcadosByMarca(marca);

        return res.status(200).json(calcados);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados por marca.",
            error,
        });
    }
};

export const readTotalPares = async (req: Request, res: Response) => {
    try {
        const total = await contarTotalPares();

        return res.status(200).json({
            message: "Total de pares no estoque:",
            total_pares: total,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao contar total de pares.",
            error,
        });
    }
};


// Com isso, posso afirmar com certeza que pegeui o padrão de repetição do TS. Mas vou ter que dizer, minha maior dificuldade foi diferenciar Await de async, de resto, é mais repetição de processo.

