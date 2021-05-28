const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(morgan('dev'));


// define routing
const guestRouter = require('./routes/guest.route');
app.use(guestRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
  console.log('app is listening on port: '+ PORT);
});
