# App

GymPass style app.

# RFs (Requisitos Funcionais)

- [x] -> Deve ser possível se cadastrar;
- [x] -> Deve ser possível se autenticar;
- [x] -> Deve ser possível obter o perfil de um usuario logado;
- [ ] -> Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] -> Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] -> Deve ser possível o usuário buscar academias próximas;
- [ ] -> Deve ser possível o usuário buscar academias pelo nome;
- [x] -> Deve ser possível o usuário realizar check-in em uma academia;
- [ ] -> Deve ser possível validar o check-in de um usuário;
- [x] -> Deve ser possivel cadastrar uma academia;

# RN (Regras de Negocios)

- [x] -> O usuário não deve poder se cadastrar com um email duplicado;
- [x] -> O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] -> O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] -> O check-in só pode ser validado até 20 min após criado;
- [ ] -> O check-in só pode ser validado por administradores;
- [ ] -> A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos Nao Funcionais)

- [x] -> A senha do usuário precisa estar criptografada;
- [x] -> Os dados da aplicaçao precisam estar persistidos em um banco PostgreSQL;
- [ ] -> Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] -> O usuário deve ser identificado por JWT (JSON Web Token);