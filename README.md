# 🐕 api-now

<img src="logo.png" height="100" />

Launch an API Server to serve a JSON, JS file or faker data with HTTPS support.

Based on json-server with more features:
- Default datasets out-of-the-box: users, posts (using faker). Just run $ api-now
- HTTPS support (with key, cert files).
- Can take .json or .js file.
- /echo route to respond parameters back as json.
- /login route (POST) to respond with a dummy JWT token (using jsonwebtoken).

<img src="https://github.com/ngduc/api-now/workflows/Node%20CI/badge.svg" />

## 🔧 Install

- As a dependency: `$ npm install api-now`
- As a global command: `$ npm install api-now -g`
- Or run it without installing: `$ npx api-now`

## 📖 Usage

`$ api-now`

That's it! You can try it now:

```
$ curl http://localhost:3003/users

Other Useful Routes:
$ curl http://localhost:3003/echo?any=value
$ curl -X POST http://localhost:3003/login -H 'Content-Type: application/json' -d '{"username": "test"}'
```

## 📖 Serve data from a file

Create [db.json](tests/sample.json) file, then run api-now to start a HTTPS server at port 3003:
```
{
  "posts": [
    { "id": 1, "title": "Post title 1" },
    { "id": 2, "title": "Post title 2" }
  ]
}
```

```
$ api-now db.json
$ api-now -k keyFile -c certFile -p 3003 -w db.json
```

Or create a .js file and use "faker" data like [generateData.js](tests/generateData.js)

How to use:

```
Usage: api-now [options] [json or js file]
Options:
  -c, --cert <certFile>  HTTPS cert file
  -k, --key <keyFile>    HTTPS key file
  -p, --port <port>      Use custom port
  -v, --version          Show version
  -w, --watch            Watch for changes and reload (default: false)
  -h, --help             Output usage information
```

## 📖 Tips

- json-server - [Repo & Documents](https://github.com/typicode/json-server)

- Command line to generate self-signed Key & Cert files:

`openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=California/L=San Francisco/O=Organization/CN=CommonName" -keyout key.pem -out cert.pem`

- Article: [How to create your command-line program (CLI) with NodeJS and Commander.js](https://medium.com/@ngduc/how-to-create-a-command-line-npm-module-cli-using-commander-js-1073e616aee7)

- One more thing:
  - ★ this repo, open PRs and dance :)