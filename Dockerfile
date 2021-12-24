FROM node:17

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

ENV DB_HOST=host.docker.internal

EXPOSE 5000:5000

CMD ["yarn", "dev"]
