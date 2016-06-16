'use strict';

const server = require('./server');

const port = process.env.PORT || 1337;

server.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
