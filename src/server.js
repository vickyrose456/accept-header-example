const http = require('http');
const { resourceUsage } = require('process');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//object of possible URL's
const urlStruct = {
  '/': responseHandler.getIndex,
  '/cats': responseHandler.getCats,
  index : responseHandler.getIndex
};

const onRequest = (request, response) => {
  const parseUrl = url.parse(request.url);
  const acceptedType = request.headers.accept.split(',');

  //console.dir(request.url);

  if(urlStruct[parseUrl.pathname])
  {
    //this is a fns and we are passing these 3 variables 
    urlStruct[parseUrl.pathname](request, response, acceptedType);
  }else
  {
    //send back index page ~Usually the 404 page of a website
    urlStruct.index(request, response);
  }


};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
