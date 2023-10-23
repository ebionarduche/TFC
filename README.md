# Table de Campeonato de Futebol

## Descrição

Este é um guia para o projeto de Backend que cria uma API para o sistema de gerenciamento de partidas de futebol.
O sistema oferece uma variedade de serviços, incluindo autenticação de usuários, cadastro e atualização de partidas para administradores, compilação dos dados das partidas em uma tabela de classificação e filtragem de partidas por time mandante e/ou visitante.
O projeto utiliza várias tecnologias e práticas de desenvolvimento para garantir eficiência, segurança e escalabilidade.

## Tecnologias Utilizadas

- **Node.js:** Plataforma que permite a execução de código JavaScript no servidor.
- **Express:** Framework web para Node.js que simplifica a criação de APIs RESTful.
- **TypeScript:** Superconjunto tipado de JavaScript que traz segurança e facilidade de manutenção ao código.
- **MySQL:** Sistema de gerenciamento de banco de dados relacional para armazenamento de dados.
- **Sequelize:** ORM (Object-Relational Mapping) para interação com o banco de dados MySQL, facilitando a manipulação de dados.
- **Docker:** Plataforma de contêiner para controlar as versões das dependências e garantir a consistência do ambiente de desenvolvimento.
- **Programação Orientada a Objetos (POO):** O projeto é desenvolvido com princípios de programação orientada a objetos, tornando o código mais organizado e manutenível.
- **JWT (JSON Web Tokens):** Utilizado para autenticação e autorização, permitindo que os usuários acessem recursos protegidos de forma segura.
- **Mocha, Sinon e Chai:** Bibliotecas para criação e execução de testes.

## Funcionalidades

O projeto oferece várias funcionalidades para o sistema de gerenciamento de partidas de futebol:

- **Autenticação:** Os usuários podem se registrar, fazer login e fazer logout, garantindo acesso seguro às funcionalidades do sistema.

- **Administração de Partidas:** Usuários administradores podem cadastrar, atualizar e encerrar partidas, controlando o sistema de pontuação.

- **Tabela de Classificação:** O sistema compila os dados das partidas e gera uma tabela de classificação que é acessível a todos os usuários.

- **Filtragem de Partidas:** Os usuários podem filtrar partidas com base no time mandante e/ou visitante, facilitando a busca por partidas específicas.

## Operações CRUD

  O projeto oferece operações CRUD (Create, Read, Update, Delete)
para manipulação da tabela do campeonato de futebol.
  Você pode criar, ler, atualizar e excluir registros relacionados a jogos,
classificação e outros dados.