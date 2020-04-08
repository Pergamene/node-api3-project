const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`\n=== LOG ===\nRequest method: ${req.method}\nRequest URL: ${req.originalUrl}\nTimestamp: ${new Date()}\n`);

  next();
}

module.exports = server;
