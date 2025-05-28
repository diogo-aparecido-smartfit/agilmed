# AgilMed — Documentação Técnica

## Tecnologias Utilizadas

### Frontend (Mobile)

- **React Native (Expo)**
- **Redux Toolkit** (gerenciamento de estado)
- **Redux Saga** (side effects)
- **React Hook Form + Yup** (formulários e validação)
- **Axios** (requisições HTTP)
- **React Query** (cache e fetch de dados)
- **React Native Flash Message** (notificações)
- **@react-native-async-storage/async-storage** (armazenamento local)
- **Expo Router** (navegação)
- **Styled Components** (estilização)
- **Date-fns** (manipulação de datas)

### Backend (API)

- **Node.js + Express**
- **Sequelize** (ORM)
- **PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **Nodemailer** (envio de e-mails)
- **Swagger** (documentação da API)
- **Azure Blob Storage** (upload de imagens)
- **Natural** (NLP para chatbot)
- **Docker** (containerização)

---

## Estrutura de Pastas

### Mobile

- `/app/screens`: Telas principais (login, cadastro, home, agendamentos, etc)
- `/app/store`: Redux slices, sagas e store
- `/app/services`: Serviços de API e integração
- `/app/hooks`: Hooks customizados (ex: `useAppointments`)
- `/app/types`: Tipos TypeScript globais
- `/app/utils`: Funções utilitárias

### Backend

- `/api/src/controllers`: Controllers das rotas
- `/api/src/services`: Lógica de negócio
- `/api/src/repositories`: Acesso ao banco de dados
- `/api/src/models`: Modelos Sequelize
- `/api/src/middlewares`: Middlewares (auth, upload, bot-actions)
- `/api/src/routes`: Rotas Express
- `/api/src/utils`: Utilitários (formatação, NLP, templates de e-mail)
- `/api/migrations`: Migrations do banco

---

## Fluxo de Uso

### 1. Autenticação

- **Cadastro:** Usuário preenche formulário, recebe código de confirmação por e-mail.
- **Login:** Usuário entra com CPF ou e-mail e senha.
- **Verificação:** Código enviado por e-mail deve ser validado para ativar conta.
- **Recuperação de senha:** Envio de código para redefinição.

### 2. Agendamentos

- **Listagem:** Usuário vê seus agendamentos futuros.
- **Criação:** Seleciona profissional, data e motivo. Confirmação via chatbot ou tela.
- **Cancelamento:** Usuário pode cancelar agendamento.
- **Detalhes:** Visualização de informações do agendamento, endereço e mapa.

### 3. Unidades Médicas

- **Busca de unidades próximas:** Baseada em localização e tipo de serviço.
- **Detalhes da unidade:** Endereço, horário de funcionamento, avaliações.

### 4. Chatbot

- **Assistente virtual:** Ajuda a agendar consultas, tirar dúvidas e encontrar médicos.
- **NLP:** Classificação de intenções e respostas automáticas.

### 5. Perfil do Usuário

- **Visualização e edição:** Dados pessoais, foto de perfil (upload para Azure).
- **Exclusão de conta:** Usuário pode remover sua conta.

---

## Observações

- **API protegida por JWT:** Rotas sensíveis exigem autenticação.
- **Upload de imagens:** Feito via `multipart/form-data` para Azure Blob Storage.
- **Documentação da API:** Disponível via Swagger em `/docs`.
- **Mensagens de erro e sucesso:** Exibidas via Flash Message no app.
