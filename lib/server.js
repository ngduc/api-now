module.exports = function(options) {
  const path = require('path');
  const fs = require('fs');
  const https = require('https');
  const jsonServer = require('json-server');
  const server = jsonServer.create();

  let data = {};
  const filePath = path.join(__dirname, '../' + options.file);
  if (filePath.endsWith('.js') > 0) {
    data = require(filePath)();
  } else {
    data = filePath;
  }
  const router = jsonServer.router(data);
  const middlewares = jsonServer.defaults();

  // Set default middlewares (logger, static, cors and no-cache)
  server.use(middlewares);

  // Add custom routes before JSON Server router
  server.get('/echo', (req, res) => {
    res.jsonp(req.query);
  });

  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser);
  server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
  });

  // Use default router
  server.use(router);

  if (options.key && options.cert) {
    // for HTTPS
    const serverOptions = {
      key: fs.readFileSync(options.key),
      cert: fs.readFileSync(options.cert)
    };
    https.createServer(serverOptions, server).listen(options.port, function() {
      console.log('🎫  json-now - HTTPS - https://localhost:' + options.port);
    });
  } else {
    server.listen(options.port, () => {
      console.log('🎫  json-now - http://localhost:' + options.port);
    });
  }
};
