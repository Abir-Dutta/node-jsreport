const http = require('http');
const jsreport = require('jsreport');

http.createServer((req, res) => {
  jsreport.render({
    template: {
      content: 'Hello world',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    }
  }).then((out) => {
    out.stream.pipe(res);
  }).catch((e) => {
    res.end(e.message);
  });
}).listen(1337, '127.0.0.1');