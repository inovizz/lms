import path from 'path';
import express from 'express';
import logger from 'morgan';
import config from './server/config';
const app = express();
import routes from './server/routes/index.route';
import bodyParser from 'body-parser';

// Console the logger
if (config.env === 'development') {
  app.use(logger('dev'));
}

// Middlewares
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing

// Route api
app.use('/api', routes);

// Default - Route WildCard
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'dist','index.html'));
});


// Start Server
app.listen(config.port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening on ${config.base_url}`);
});