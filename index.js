//dependecies
const http = require("http");

const { handleReqRes } = require("./helpers/handleReqRes");



// app object
const app = {};

//configuration
app.config = {
  port: 3000,
};

const chosenHandler = routes[tr]

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`server running on ${app.config.port}`);
  });
};

// request response
app.handleReqRes = handleReqRes

app.createServer();
