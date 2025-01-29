<h1 align= center> GymPass style app.</h1>

<br>

# RFs (Requisitos Funcionais)

- [x] -> Deve ser possível se cadastrar;
- [x] -> Deve ser possível se autenticar;
- [x] -> Deve ser possível obter o perfil de um usuario logado;
- [x] -> Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] -> Deve ser possível o usuário obter seu histórico de check-ins;
- [x] -> Deve ser possível o usuário buscar academias próximas (até 10 km);
- [x] -> Deve ser possível o usuário buscar academias pelo nome;
- [x] -> Deve ser possível o usuário realizar check-in em uma academia;
- [x] -> Deve ser possível validar o check-in de um usuário;
- [x] -> Deve ser possivel cadastrar uma academia;

# RN (Regras de Negocios)

- [x] -> O usuário não deve poder se cadastrar com um email duplicado;
- [x] -> O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] -> O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] -> O check-in só pode ser validado até 20 min após criado;
- [x] -> O check-in só pode ser validado por administradores;
- [x] -> A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos Nao Funcionais)

- [x] -> A senha do usuário precisa estar criptografada;
- [x] -> Os dados da aplicaçao precisam estar persistidos em um banco PostgreSQL;
- [x] -> Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [x] -> O usuário deve ser identificado por JWT (JSON Web Token);

<h3>Tecnologias Utilizadas</h3>

<ul>
  <li>Node.js (v14+)</li>
  <li>Typescript</li>
  <li>Fastify </li>
  <li>Vitest - Testes</li>
  <li>Prisma - ORM para PostgreSQL</li>
  <li>PostgreSQL - Banco de dados relacional</li>
  <li>dotenv - Gerenciamento de variáveis de ambiente</li>
  <li>jsonwebtoken (JWT) - Autenticação e autorização</li>
  <li>bcrypt - Hashing seguro de senhas</li>
</ul>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,prisma,vitest,docker" />
  </a>
</p>