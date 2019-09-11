# json-now

Launch an API Server to serve data from a JSON or JS file.

Based on json-server.

### INSTALL

As a dependency: `$ npm install json-now`

As a global command: `$ npm install json-now -g`

### USAGE

`$ json-now [options] <jsonFile or jsFile>`

Example: start a HTTPS server at port 3003:

`$ json-now -k keyFile -c certFile -p 3003 data.json`

### TIPS

Command line to generate self-signed Key & Cert files:

`openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=California/L=San Francisco/O=Organization/CN=CommonName" -keyout key.pem -out cert.pem`

One more thing: ★ this repo, open PRs and dance :)