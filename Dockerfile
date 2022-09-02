FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-dev
COPY . .
EXPOSE 3030
CMD [ "node", "server.js" ]