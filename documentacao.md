# Documentação

# Documentação — Desafio Desenvolvimento
# PTC 26.1
# Candidato: Edisio Uchôa Cavalcante Neto
# Centro Integrado de Tecnologia da Informação — CITI/UFPE

###### ADENDO SUPER IMPORTANTE, Esse documento foi revisado por IA, para ser o mais proficional possível e garantir uma leitura satisfatória do meu racioccínio. Dito isso, existe também a leitura limpa do uso de Ia na qual escrevi tudo a mão. A mesma se encontra dentro do código como comentários. É o meu raciocínio bruto que desenvolvi durante a execução do desafio e onde fica a prova certeira sem filtros do que aprendi e entendi do desafio. #######

# Se isso não for satisfatório, estou a disposição para explicar tudo com minhas palavras pelo contato do meu email e demonstrar que entendi de verdade; 

eucn@cin.ufpe.br.



# 1. Primeiro Contato com o Desafio

No primeiro contato com o enunciado, o sentimento foi de insegurança mesmo, por conta da
falta de experiência prévia com o ambiente proposto. Ver um repositório com dezenas de
arquivos e pastas não ajudou. O norte inicial veio da gravação do treinamento de
desenvolvimento disponibilizada pelo CITI, que foi essencial pra entender a estrutura do
projeto e conseguir dar os primeiros passos.

# 2. Compreensão do Ambiente de Trabalho

Antes de escrever qualquer linha de código, o foco foi entender as ferramentas. O Docker foi
identificado como o responsável por containerizar a aplicação, criando um ambiente isolado e
padronizado. O Prisma foi compreendido como um ORM, um tradutor que converte comandos
TypeScript em instruções SQL, eliminando a necessidade de escrever queries na mão. O
Express foi entendido como o framework que gerencia as requisições HTTP, funcionando
como a espinha dorsal do servidor.

# 3. Implementação do CRUD

## 3.1 Importações e estrutura base
    Todas as funções do controller partem das mesmas duas importações. Request representa a
    requisição, o que está sendo pedido ao servidor, contendo dados, parâmetros e etc. Response
    é o que a biblioteca envia de volta, seja os dados solicitados ou uma mensagem de erro. O
    Express é o framework que já vem com toda a infraestrutura pronta. O Prisma é o tradutor de
    TypeScript para o banco de dados.

## 3.2 CREATE
    A função createCalcado é exportada pra ser usada em outros arquivos e declarada como
    async, o que faz o código esperar a resposta do banco antes de continuar. Ela recebe req e
    res como parâmetros, a requisição que chega e a resposta que será devolvida. Na primeira
    linha do try, o req.body é desestruturado. O body é uma estrutura de dados da internet
    chamada JSON, enviada por uma rota do protocolo HTTP. O Express tem um middleware
    chamado express.json() que converte automaticamente o texto JSON em um objeto
    JavaScript. O Prisma então insere esse objeto no banco. O try e catch são conhecidos do
    Python como try e except: tente isso, se der errado, execute isso. Essa é uma proteção
    essencial, sem ela um erro poderia derrubar o servidor inteiro. Em caso de sucesso, retorna o
    status 201, código HTTP para criado, com o objeto cadastrado incluindo o id gerado
    automaticamente pelo banco.

## 3.3 READ
    A função readAllCalcados utiliza o prisma.calcado.findMany() pra buscar todos os registros da
    tabela. Retorna status 200, código HTTP pra ok, usado quando se busca algo já existente,
    diferente do 201 que é pra criação.

## 3.4 UPDATE
    A função updateCalcado utiliza o id que foi criado pelo banco pra localizar o objeto que se
    deseja alterar. O id vem pela URL via req.params e é convertido de string pra número com
    Number(), pois o req.params sempre entrega valores como texto e o banco espera um número
    inteiro. O prisma.calcado.update() localiza o registro pelo where e substitui os dados pelo que
    vem no data. O await funciona como uma barreira que faz o código esperar, sem ele o retorno
    aconteceria antes do banco terminar de processar.
## 3.5 DELETE
    A função deleteCalcado segue a mesma lógica do update, recebendo apenas o id pela URL.
    Não há req.body pois pra deletar basta saber qual registro remover. O resultado não é
    armazenado em variável pois não há nada pra retornar após a remoção.

## 4. Criação das Rotas
    As rotas foram definidas no arquivo routes.ts. O Express funciona como a biblioteca e
    arquitetura que já estava pronta, sem ele tudo teria que ser feito do zero. A ideia central desse
    arquivo é fazer a comunicação entre toda a arquitetura, ligando cada rota à sua função
    correspondente no controller. Os métodos HTTP foram pesquisados e compreendidos
    individualmente: POST pra criar, GET pra buscar, PATCH pra atualizar e DELETE pra deletar.
    As rotas de update e delete incluem o parâmetro dinâmico :id na URL, que permite identificar
    qual registro específico deve ser manipulado.

# 5. Desafio Extra
A decisão de realizar o desafio extra foi motivada pelo desejo de demonstrar proatividade e
disposição pra ir além do mínimo exigido. As três funções foram implementadas no arquivo
CalcadosRepositorie.ts, separadas do controller conforme orientação do enunciado, uma
prática de modularização onde o repositório concentra a lógica de consulta especializada.

## 5.1 Buscar por tamanho
    Usei como parâmetro da função assíncrona o tamanho do calçado, do tipo number. Onde o
    tamanho for esse número, o Prisma filtra por isso. O campo tamanho está definido como
    inteiro no schema.prisma, por isso number e não string, pois 42 (número) é diferente de '42'
    (texto) pro banco.
## 5.2 Filtrar por marca
    A função retorna apenas os calçados que têm correlação com a string buscada. A marca é
    texto, então comparamos texto com texto. A equivalência é exata, se tem Nike, a string Nike é
    a sequência buscada lá no banco.
## 5.3 Contar total de pares
    O aggregate é uma função do Prisma que faz operações matemáticas diretamente no banco
    de dados. Usamos _sum pra somar todas as quantidades em estoque de todos os calçados de
    uma vez, muito mais eficiente do que buscar tudo e somar no código. O operador ?? 0 é uma
    proteção pro caso do resultado ser null, retornando zero em vez de erro.

# 6. Uso de Inteligência Artificial
A inteligência artificial foi utilizada como ferramenta de aprendizado ativo ao longo de todo o
desafio. Foi solicitado explicitamente que a IA não fornecesse o código completo, mas que
ensinasse a sintaxe passo a passo, explicasse o propósito de cada estrutura e fizesse
perguntas pra verificar o entendimento.

O aprendizado aconteceu de forma progressiva: primeiro a compreensão das importações e
dos tipos do TypeScript, depois a lógica das funções assíncronas com async/await, que foi a
maior dificuldade do processo, diferenciar os dois. Em seguida o papel do try/catch, e por fim a
interação com o Prisma e as rotas do Express. Erros como importações incorretas, variáveis
com nomes errados e problemas de configuração do ambiente foram investigados e resolvidos
com auxílio da IA, sempre com o objetivo de entender a causa raiz.

Exemplos de uso declarados ao longo do código: compreensão da sintaxe do TypeScript,
entendimento do papel de cada ferramenta do ambiente, aprendizado do padrão async/await e
investigação de erros de configuração do Docker e do Prisma.

A IA foi uma professora prática e objetiva, essencial pra acelerar o aprendizado, mas nunca a
protagonista do raciocínio. O entendimento do ambiente, das decisões de implementação e da
lógica por trás de cada função foi construído ativamente ao longo do processo.

# 7. Conclusão

O sistema desenvolvido é uma API REST completa pra gerenciamento de estoque de
calçados, capaz de cadastrar, listar, atualizar e remover produtos, além de buscar por
tamanho, filtrar por marca e contar o total de pares em estoque. Se fosse explicar a um amigo
que nunca programou: foi criado um sistema útil pra gerenciar estoques e catálogos de
calçados, sendo possível controlar o banco e com praticidade enviar e receber requisições. O
desafio foi, acima de tudo, uma experiência de imersão real no ambiente de desenvolvimento.