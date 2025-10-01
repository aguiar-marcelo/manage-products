# 📦 Product Flow - Sistema de Gerenciamento de Produtos

## 🚀 Sobre o Projeto

Este é um sistema **full-stack** robusto e completo, projetado para o gerenciamento eficiente de produtos. Ele oferece uma interface de usuário moderna e responsiva para cadastro, visualização, atualização e exclusão de itens, garantindo que você tenha controle total sobre seu inventário.

A arquitetura do projeto é totalmente conteinerizada utilizando **Docker**, facilitando o desenvolvimento e a execução em qualquer ambiente.

## ✨ Tecnologias Utilizadas

A aplicação é construída sobre uma pilha de tecnologias modernas e amplamente utilizadas:

### Frontend (SPA - Single Page Application)

| Tecnologia | Função | 
 | ----- | ----- | 
| **Vue.js** | Framework JavaScript progressivo para a construção da interface. | 
| **Vuetify** | Framework de componentes UI do Vue baseado em Material Design, responsável por toda a estilização e responsividade. | 

### Backend (API RESTful)

| Tecnologia | Função | 
 | ----- | ----- | 
| **Django** | Framework Python de alto nível para o rápido desenvolvimento da API RESTful. | 
| **MySQL** | Sistema de gerenciamento de banco de dados relacional para persistência dos dados dos produtos. | 

### Infraestrutura

| Tecnologia | Função | 
 | ----- | ----- | 
| **Docker** | Plataforma de conteinerização, garantindo que todas as dependências (Backend, Frontend e Banco de Dados) rodem de forma isolada e consistente. | 

## 🛠️ Pré-requisitos

Para executar este projeto localmente, você deve ter o **Docker** instalado e funcionando em sua máquina.

* **Docker:** Certifique-se de que o motor do Docker está ativo. Se você estiver usando o **Docker Desktop**, ele deve estar aberto e rodando em segundo plano.

## ⚙️ Executando o Projeto

Siga os passos abaixo para clonar o repositório e subir o sistema completo em sua máquina:

### 1. Clonar o Repositório

Abra seu terminal ou prompt de comando e clone o projeto:

git clone <URL_DO_SEU_REPOSITORIO>
cd <pasta_do_projeto>


### 2. Subir os Contêineres

Com o **Docker** ativo, execute o seguinte comando na raiz do projeto. Este comando irá construir as imagens (caso seja a primeira execução) e iniciar todos os serviços em segundo plano (`-d`):
```
docker-compose up -d --build
```

> ⏳ O processo de construção e inicialização pode levar alguns minutos na primeira vez.

## 🌐 Acessando o Sistema

Após a execução bem-sucedida do comando `docker-compose up`, o sistema estará acessível nos seguintes endereços:

| Serviço | URL | 
 | ----- | ----- | 
| **Aplicação Frontend (Vue.js)** | [http://localhost:8080/](http://localhost:8080/) | 
| **Documentação da API (Swagger UI)** | [http://localhost:8000/api/schema/swagger-ui](http://localhost:8000/api/schema/swagger-ui) | 

## 🛑 Parando o Projeto

Para desligar todos os contêineres e remover as redes criadas, execute:
```
docker-compose down
```


