FROM node:22

WORKDIR /app

COPY package*.json ./
RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/app.js"]
