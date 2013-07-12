var connect = require('connect')
  , port = 8888
  , server = connect()
    .use(connect.static(__dirname))
    .use(connect.directory(__dirname))
    .use(connect.errorHandler({ showStack: true, dumpExceptions: true }))
    .use(connect.compress())
    .listen(port);

console.log("Server running on http://localhost:" + port);