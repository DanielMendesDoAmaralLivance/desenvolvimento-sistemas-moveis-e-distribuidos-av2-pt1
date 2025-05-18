# 📦 Serviço de Pagamentos - NestJS

Este projeto é um **serviço de pagamentos** construído com [NestJS](https://nestjs.com/), responsável por gerenciar toda a lógica relacionada a pagamentos em um sistema distribuído.

## 🧱 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Prisma ORM](https://www.prisma.io/)

## ⚙️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DanielMendesDoAmaralLivance/desenvolvimento-sistemas-moveis-e-distribuidos-av2-pt1
cd desenvolvimento-sistemas-moveis-e-distribuidos-av2-pt1
```

### 2. Crie o arquivo .env

```.env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
``` 
> 🔐 Certifique-se de ajustar usuario, senha, localhost e nome_do_banco conforme necessário.

### 3. Suba os containers com Docker

Você precisa subir o ambiente Docker contendo PostgreSQL e RabbitMQ.

```bash
docker compose -f docker/docker-compose.yml -f docker/docker-rabbit.yml up -d
```
> Isso irá subir o banco de dados PostgreSQL, o pgAdmin e o RabbitMQ.

### 4. Instale as dependências

```bash
pnpm i
```

### 5. Gere o cliente Prisma e aplique as migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

### 6. Inicie o serviço

```bash
pnpm run start:dev
```
> O serviço estará disponível em: http://localhost:3000

## Testando com Postman

Existe uma collection do Postman para testar os endpoints da API.

### Importando a Collection

1. Abra o Postman.
2. Vá em Import.
3. Importe o arquivo .postman_collection.json disponível no projeto.
