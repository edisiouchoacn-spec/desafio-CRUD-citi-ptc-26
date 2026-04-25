import prisma from "@database";

export const getCalcadosByTamanho = async (tamanho: number) => {
    const calcados = await prisma.calcado.findMany({
        where: { tamanho },
    });
    return calcados;
};

// O que isso faz? Simples até, como expliquei a sintaxe e o que entendi, vou explicar a função geral dessas proximas funções.
// A ideia aqui é uma só: Usei como parametro da função assincrona o tamanho do calçado. 'number'. onde o tamanho for esse numero, ele filtra por isso.
// Lembrando que no prisma ele está definido como inteiro e não string, por isso, number.

export const getCalcadosByMarca = async (marca: string) => {
    const calcados = await prisma.calcado.findMany({
        where: { marca },
    });
    return calcados;
};

// Dessa vez, obviamente, a função está retornando apenas os itens calçados que tem correalação, a string dos itens é sobretudo buscada pela exata equivalencia.
// Se tem nike, "nike" seria a sequencia buscada la no banco.

export const contarTotalPares = async () => {
    const resultado = await prisma.calcado.aggregate({
        _sum: {
            quantidade_em_estoque: true,
        },
    });
    return resultado._sum.quantidade_em_estoque ?? 0;
};

// Primeiro, o final, aprendi que ?? 0; é uma forma de proteção para o return ser Null ao invés de erro.
// O aggregate é uma função do Prisma que faz operações matemáticas ja no banco de dados.
// No meu caso usamos _sum para somar todas as quantidades em estoque de todos os calçados de uma vez só.