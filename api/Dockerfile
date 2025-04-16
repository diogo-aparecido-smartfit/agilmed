# Etapa 1: Instalar as dependências
FROM node:18 AS build

WORKDIR /app

# Copiar o package.json e yarn.lock para instalar dependências
COPY package.json yarn.lock ./

# Instalar as dependências do projeto
RUN yarn install --frozen-lockfile

# Copiar o restante do código
COPY . .

# Etapa 2: Build do projeto
RUN yarn build

# Etapa 3: Rodar a aplicação
EXPOSE 3000
CMD ["yarn", "start"]
