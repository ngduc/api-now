module.exports = function(options) {
  const path = require('path');
  const fs = require('fs');
  const https = require('https');
  const utils = require('./utils');

  const jsonServer = require('json-server');
  const server = jsonServer.create();

  let data = {};

  // set filePath
  let filePath = '';
  let defaultMsgStr = '';
  if (options.file) {
    filePath = path.join(process.cwd(), options.file);
  } else {
    filePath = path.join(__dirname, '../tests/generateData.js'); // Default Dataset
    defaultMsgStr = ' - default routes: /users /posts';
  }

  // check & process filePath
  if (!fs.existsSync(filePath)) {
    console.log(`Error: ${filePath} doesn't exist.`);
    return;
  }
  if (filePath.endsWith('.json')) {
    data = filePath; // .json file
  } else {
    data = require(filePath)(); // .js file
  }
  const router = jsonServer.router(data);

  let middlewares = jsonServer.defaults();
  if (options.watch && filePath.endsWith('.json')) {
    // for --watch => add middle to reload file:
    middlewares = [
      ...jsonServer.defaults({ readOnly: true }),
      ...[
        (req, res, next) =>
          utils.readJson(filePath, (err, jsonContent) => {
            if (err) {
              console.log(err);
              return;
            }
            router.db.assign(jsonContent).write();
            next();
          })
      ]
    ];
  }

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
      console.log('🐕  api-now - HTTPS - https://localhost:' + options.port + defaultMsgStr);
    });
  } else {
    server.listen(options.port, () => {
      console.log('🐕  api-now - http://localhost:' + options.port + defaultMsgStr);
    });
  }
};
