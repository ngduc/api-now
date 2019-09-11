# json-now

Launch an API Server to serve data from a JSON or JS file.

Based on json-server.

### INSTALL

As a dependency: `$ npm install json-now`

As a global command: `$ npm install json-now -g`

### USAGE

Create [db.json](tests/sample.json) file, then run json-now to start a HTTPS server at port 3003:
```
{
  "posts": [
    { "id": 1, "title": "Post title 1" },
    { "id": 2, "title": "Post title 2" }
  ]
}
```
`$ json-now -k keyFile -c certFile -p 3003 -w db.json`

or create a .js file and use "faker" data - [generateData.js](tests/generateData.js)

How to use:

```
Usage: json-now [options] <json or js file>
Options:
  -c, --cert <certFile>  HTTPS cert file
  -k, --key <keyFile>    HTTPS key file
  -p, --port <port>      use custom port
  -v, --version          show version
  -w, --watch            Watch for changes and reload (default: false)
  -h, --help             output usage information
```

### TIPS

- Command line to generate self-signed Key & Cert files:

`openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=California/L=San Francisco/O=Organization/CN=CommonName" -keyout key.pem -out cert.pem`

- json-server - [repo](https://github.com/typicode/json-server)

- One more thing:

★ this repo, open PRs and dance :)