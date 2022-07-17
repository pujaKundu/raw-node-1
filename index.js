//dependecies
const http = require("http");

const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
// app object
const app = {};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`server running on ${environment.port}`);
  });
};

// request response
app.handleReqRes = handleReqRes;

app.createServer();
