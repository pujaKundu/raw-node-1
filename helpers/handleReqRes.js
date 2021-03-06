const { StringDecoder } = require("string_decoder");
const routes = require("../routes");

const url = require("url");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

const handler = {};

handler.handleReqRes = (req, res) => {
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

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;


  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      //return the final response
      res.writeHead(statusCode);
      res.end(payloadString);
    });
    console.log(realData);
    res.end("Hello World");
  });
};

module.exports = handler;
