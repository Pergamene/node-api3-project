const express = require('express');

const logger = require('./logger/Logger');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.listen(5000, () => console.log(`\n== Server running on http://localhost:5000 ==\n`));
