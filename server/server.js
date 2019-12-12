const express = require('express');
const cors = require('cors');
const dbController = require('./controllers/database.controller');
const dbRouter = require('./routes/database.routes');
const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');

const app = express();

dbController.initiate();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api', dbRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

process.on('exit', function() {
    dbController.close();
});

app.listen(5000, () => {
    console.log('Server started!');
});

dbController.createIndices();
dbController.createLogs();
dbController.addFlowerImagesIfNeeded();