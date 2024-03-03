FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json client/
RUN npm run install-frontend --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY frontend/ client/
RUN npm run build --prefix frontend

COPY server/ server/

USER node

CMD [ 'npm', 'start', '--prefix', 'server' ]

EXPOSE 8000