# json-now

<img src="logo.png" />

Launch an API Server to serve data from a JSON or JS file with HTTPS support.

Based on json-server. More features:
- Default datasets out-of-the-box: users, posts (using faker). Just run $ json-now
- HTTPS support (with key, cert files).
- Can take .json or .js file.

### INSTALL

As a dependency: `$ npm install json-now`

As a global command: `$ npm install json-now -g`

Or run it without installing: `$ npx json-now`

### USAGE

`$ json-now`

Then try it like `$ curl http://localhost:3003`

#### Serve data from a JSON file:

Create [db.json](tests/sample.json) file, then run json-now to start a HTTPS server at port 3003:
```
{
  "posts": [
    { "id": 1, "title": "Post title 1" },
    { "id": 2, "title": "Post title 2" }
  ]
}
```

```
$ json-now db.json
$ json-now -k keyFile -c certFile -p 3003 -w db.json
```

or create a .js file and use "faker" data like [generateData.js](tests/generateData.js)

How to use:

```
Usage: json-now [options] [json or js file]
Options:
  -c, --cert <certFile>  HTTPS cert file
  -k, --key <keyFile>    HTTPS key file
  -p, --port <port>      Use custom port
  -v, --version          Show version
  -w, --watch            Watch for changes and reload (default: false)
  -h, --help             Output usage information
```

### TIPS

- json-server - [Repo & Documents](https://github.com/typicode/json-server)

- Command line to generate self-signed Key & Cert files:

`openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=California/L=San Francisco/O=Organization/CN=CommonName" -keyout key.pem -out cert.pem`

- Article: [How to create your command-line program (CLI) with NodeJS and Commander.js](https://medium.com/@ngduc/how-to-create-a-command-line-npm-module-cli-using-commander-js-1073e616aee7)

- One more thing:
  - ★ this repo, open PRs and dance :)