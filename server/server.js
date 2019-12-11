const express = require('express');
const cors = require('cors');
const dbController = require('./controllers/database.controller');
const dbRouter = require('./routes/database.routes');

const app = express();

dbController.initiate();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api', dbRouter);

process.on('exit', function() {
    dbController.close();
});

app.listen(5000, () => {
  console.log('Server started!');
});
