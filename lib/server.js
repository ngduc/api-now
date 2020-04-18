module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const https = require('https');
  const utils = require('./utils');

  const express = require('express');
  const jsonServer = require('json-server');
  const server = jsonServer.create();

  const loginRoute = require('./loginRoute');
  const { apolloServer } = require('./routes/apolloServer');

  const currentDir = process.cwd();
  let data = {};

  // set filePath
  let filePath = '';
  let defaultMsgStr = '';
  if (options.file) {
    filePath = path.join(currentDir, options.file);
  } else {
    filePath = path.join(__dirname, '../tests/generateData.js'); // Default Dataset
    defaultMsgStr =
      ' \nⓘ   default CRUD routes: /todos /users /posts /comments - /graphql route - other routes: /echo /file /login - see README.md or --help';
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

  const middlewareOpts = {};
  if (options.static) {
    // if it has "index.html", it will replace json-server's default index.html:
    middlewareOpts.static = currentDir + '/' + options.static;
  }

  let middlewares = jsonServer.defaults(middlewareOpts);

  if (options.watch && filePath.endsWith('.json')) {
    // for --watch => add middle to reload file:
    middlewares = [
      ...jsonServer.defaults({ ...middlewareOpts, readOnly: true }),
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

  // --static <dir>
  if (options.static) {
    server.use(express.static(currentDir + '/' + options.static));
  }

  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser);

  // server.use('/graphql', bodyParser.json(), graphQLHandler);
  apolloServer.applyMiddleware({ app: server, path: '/graphql' });

  // Add custom routes before JSON Server router
  server.get('/echo', (req, res) => {
    res.jsonp(req.query);
  });

  // serve a file (any file type)
  server.get('/file', (req, res) => {
    const { path } = req.query;
    res.sendFile(currentDir + '/' + path); // this auto sets Content-Type
  });

  // serve a random file from a directory "path"
  server.get('/image/random', (req, res) => {
    const { path } = req.query;
    const fullPath = currentDir + '/' + path;
    utils.getRandomFileFromDir(fullPath, (filePath) => {
      res.sendFile(filePath);
    });
  });

  // serve a random Avatar Image
  server.get('/avatar/random', (req, res) => {
    // const { path } = req.query;
    const fullPath = path.join(__dirname, '../data/avatar');
    utils.getRandomFileFromDir(fullPath, (filePath) => {
      res.sendFile(filePath);
    });
  });

  // serve a random Nature Image
  server.get('/nature/random', (req, res) => {
    // const { path } = req.query;
    const fullPath = path.join(__dirname, '../data/nature');
    utils.getRandomFileFromDir(fullPath, (filePath) => {
      res.sendFile(filePath);
    });
  });

  server.route('/login').post(loginRoute);

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
    https.createServer(serverOptions, server).listen(options.port, function () {
      console.log('🐕  api-now - HTTPS - https://localhost:' + options.port + defaultMsgStr);
    });
  } else {
    server.listen(options.port, () => {
      console.log('🐕  api-now - http://localhost:' + options.port + defaultMsgStr);
    });
  }
};
