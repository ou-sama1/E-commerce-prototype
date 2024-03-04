FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY .env ./

RUN npm i

COPY frontend/package.json frontend/
RUN npm run install-frontend

COPY server/package.json server/
RUN npm run install-server --omit=dev

COPY frontend/ frontend/
RUN npm run build --prefix frontend

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000