//dependecies
const http = require("http");

const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require('./lib/data')
// app object
const app = {};

//testing file system
data.delete('test', 'newFile', function (err) {
  console.log(err)
})

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
