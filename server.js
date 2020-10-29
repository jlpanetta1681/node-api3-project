const express = require('express');
const helmet = require('helmet');

const postRouter = require('./users/postRouter');
const useRouter = require('./users/userRouter');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger);
server.use('/api/posts', postRouter);
server.user('/api/users', userRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(req.method, 'Original Url:', req.originalUrl, new Date());
	next();
}

module.exports = server;
