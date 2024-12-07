# Biblioteca_Jogos
Este projeto foi desenvolvido em C# utilizando o Entity Framework Core e SQL Server como banco de dados. A API oferece funcionalidades CRUD para gerenciar gêneros de jogos e jogos em si. O projeto também implementa autenticação e autorização utilizando JWT (JSON Web Token) e ASP.NET Identity. Além de design patterns repository e unity of work.

## 1. Introdução
A "Biblioteca de Jogos" é uma API RESTful desenvolvida com ASP.NET Core, criada para facilitar o gerenciamento de gêneros de jogos e jogos. A API possui segurança através de autenticação com JWT, permitindo que apenas usuários autenticados executem operações críticas, como a criação, atualização ou exclusão de registros. Embora o projeto seja relativamente pequeno, foram aplicados alguns padrões de projeto comumente utilizados em sistemas grandes e complexos, visando a compreensão prática desses conceitos.

## 2. Configuração do Projeto
O projeto foi configurado utilizando ASP.NET Core com o Entity Framework Core para a camada de acesso a dados. A aplicação faz uso de AutoMapper para mapear automaticamente as entidades do domínio para DTOs e vice-versa. A seguir, os principais componentes utilizados no projeto:

- ASP.NET Core para a estrutura do backend.
- Entity Framework Core para acesso e manipulação do banco de dados SQL Server.
- ASP.NET Identity para autenticação e gerenciamento de usuários.
- JWT Bearer Authentication para autenticação segura baseada em tokens.
- AutoMapper para facilitar o mapeamento de objetos.
## 3. Autenticação JWT
A API utiliza JSON Web Tokens (JWT) para autenticação e autorização de usuários. Esta abordagem oferece uma forma segura de proteger a aplicação, garantindo que apenas usuários autorizados possam acessar recursos específicos.

### Processo de Autenticação:
- Login: O usuário envia credenciais de login e recebe um token JWT em caso de sucesso.
- Registro: Novos usuários são registrados, criando credenciais para acessar o sistema.
- Refresh Token: É possível renovar o token JWT caso ele tenha expirado.
## 4. Modelos e DTOs
Para facilitar a transferência de dados entre a API e os clientes, foram implementados DTOs (Data Transfer Objects). Eles oferecem um nível de abstração que ajuda a controlar os dados enviados e recebidos, além de proteger a estrutura interna do sistema.

### GeneroDTO
O GeneroDTO é responsável por representar os dados de um gênero de jogo. Ele contém as informações essenciais para serem exibidas ou manipuladas pela API. A utilização de DTOs neste contexto visa desacoplar a lógica de negócio da interface de apresentação, oferecendo mais controle sobre as informações compartilhadas entre cliente e servidor.

### JogoDTO
O JogoDTO representa um jogo, incluindo atributos como nome e o gênero associado. Ao utilizar DTOs, evitamos expor diretamente as entidades de domínio, proporcionando maior segurança e flexibilidade no desenvolvimento. A conversão entre a entidade de domínio e o DTO é gerenciada pelo AutoMapper, que facilita esse processo.

## 5. Padrões de Projeto
Para este projeto, foram implementados os padrões Repository e Unit of Work, mesmo que sua aplicabilidade seja geralmente voltada para sistemas de maior escala. A escolha foi motivada por fins didáticos, buscando uma compreensão prática desses padrões e dos benefícios que eles podem oferecer em termos de manutenção e organização do código.

### Padrão Repository
O padrão Repository foi utilizado para encapsular a lógica de acesso aos dados, separando a camada de negócio da camada de acesso ao banco de dados. Esse padrão permite que a lógica de manipulação dos dados seja centralizada, facilitando a reutilização e a manutenção do código. Mesmo sendo um projeto menor, a aplicação deste padrão ajuda a estruturar melhor o código e a entender seu funcionamento em um cenário prático.

### Padrão Unit of Work
O padrão Unit of Work coordena as transações entre diferentes repositórios, garantindo que múltiplas operações de banco de dados ocorram de forma atômica. A ideia é que todas as operações realizadas durante uma transação sejam concluídas ou revertidas juntas, mantendo a integridade dos dados. Embora essa abordagem seja mais comum em sistemas complexos, a sua aplicação aqui foi uma oportunidade de aprender e testar seu comportamento na prática.

## 6. Endpoints da API
### 6.1 Autenticação
- POST /api/auth/login: Realiza login com credenciais do usuário e retorna um token JWT.
- POST /api/auth/register: Registra um novo usuário no sistema.
- POST /api/auth/refresh-token: Gera um novo token JWT a partir de um token expirado.
### 6.2 Gêneros
- GET /api/generos: Lista todos os gêneros de jogos cadastrados.
- GET /api/generos/{id}: Retorna um gênero específico baseado no ID.
- POST /api/generos: Cria um novo gênero (requer autenticação).
- PUT /api/generos/{id}: Atualiza as informações de um gênero existente (requer autenticação).
- DELETE /api/generos/{id}: Remove um gênero do sistema (requer autenticação).
### 6.3 Jogos
- GET /api/jogos: Lista todos os jogos cadastrados.
- GET /api/jogos/{id}: Retorna um jogo específico com base no ID.
- POST /api/jogos: Adiciona um novo jogo ao sistema (requer autenticação).
- PUT /api/jogos/{id}: Atualiza as informações de um jogo existente (requer autenticação).
- DELETE /api/jogos/{id}: Exclui um jogo do sistema (requer autenticação).

## 7. Frontend Angular

Foi desenvolvido um frontend utilizando Angular para consumir a API "Biblioteca de Jogos". A aplicação Angular possui funcionalidades que permitem interagir com as rotas da API para gerenciar gêneros e jogos, incluindo a autenticação JWT.

### Funcionalidades do Frontend:
- **Autenticação**: A aplicação permite que os usuários façam login e logout através de formulários, utilizando as rotas de autenticação da API.
- **Gestão de Gêneros e Jogos**: O frontend oferece a capacidade de visualizar, adicionar, editar e excluir gêneros e jogos, consumindo os endpoints CRUD da API.
- **Armazenamento do Token JWT**: O token JWT obtido no login é armazenado no armazenamento local do navegador (localStorage), sendo enviado em todas as requisições subsequentes para autenticação.

## 8. Componentes

Abaixo estão os componentes principais que fazem parte da minha aplicação:

- **login**: Componente para o login do usuário, onde as credenciais são enviadas para a API e um token JWT é retornado.
- **logout**: Componente para a desconexão do usuário, invalidando o token JWT.
- **menu**: Navbar com links para navegar entre as páginas de jogos, gêneros e outras funcionalidades.
- **jogos**: Componente que lista todos os jogos cadastrados.
- **jogo-novo**: Componente para cadastrar novos jogos.
- **jogo-detalhe**: Componente que exibe os detalhes de um jogo específico.
- **jogo-editar**: Componente para editar as informações de um jogo existente.
- **generos**: Componente que lista todos os gêneros cadastrados.
- **genero-novo**: Componente para cadastrar novos gêneros.
- **genero-detalhe**: Componente que exibe os detalhes de um gênero específico.
- **genero-editar**: Componente para editar as informações de um gênero existente.

