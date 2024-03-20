# soat23-gp14-cliente

## Description

Este Microserviço é reponsável por gerenciar os clientes que realizam seu cadastro para realizar um pedido na Plataforma de Pedidos.
Ele possuis as funções de:
  - Cadastrar cliente
  - Listar clientes
  - Buscar cliente por ID
  - Atualizar dados permitidos do cliente
  - E anonimizar dados de um cliente

## Installation

```bash
$ yarn install
```

## Running the app

Para rodar a aplicação localmente, é necessário possuir o Postgres rodando localmente. Para desenvolvimento local optamos por usar PgAdmin, que facilita a visualização da tabela e criação da base para usar localmente.
Para subir o Postgres localmente seguimos os passos:
 - Baixar a imagem do Postgres via Docker: docker pull postgres
 - Criar e rodar o container da imagem do Postgres via linha de comando: docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
 - A criação do banco e teste de conexão foi feita via PgAdmin

Com o postgres rodando, a base fiapsql criada, devemos atualizar o arquivo local.env com as cofigurações e será possível rodar a aplicação localmente.

```bash
# load configs to env
$ source local.env

# run the app
$ yarn run start
```

## Tests

```bash
# unit tests
$ yarn run test

$ yarn run test:e2e

# test coverage
$ yarn run test:cov

# test BDD
$ yarn run test:bdd
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
