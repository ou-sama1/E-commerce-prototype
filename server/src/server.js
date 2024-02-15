const http = require("http");
const app = require("./app");

const { mongoConnect } = require('./services/mongo');

const PORT = 8000;

const server = http.createServer(app);

server.listen(PORT, async() => {
    await mongoConnect();
    console.log(`listening on port ${PORT}...`);
});