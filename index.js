//dependecies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// app object
const app = {};

//configuration
app.config = {
  port: 3000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`server running on ${app.config.port}`);
  });
};

// request response
app.handleReqRes = (req, res) => {
  //get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  //console.log(parsedUrl)
  const trimmedPath = path.replace(/^\/*|\/+$/g, "");
  //console.log(trimmedPath);
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  //console.log(queryStringObject)
  const headersObject = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
    
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end("Hello World")
  })

 
};

app.createServer();
