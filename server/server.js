const express = require('express');
const cors = require('cors');
const dbController = require('./controllers/database.controller');
const dbRouter = require('./routes/database.routes');
const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');
const pingRouter = require('./routes/ping.routes');
const session = require('express-session')

const app = express();

dbController.initiate();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(session({ //initialize express-session to allow us track the logged-in user across sessions
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use('/api', dbRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', pingRouter);

process.on('exit', function() {
    dbController.close();
});

app.listen(5000, () => {
    console.log('Server started!');
});

dbController.createIndices();
dbController.createLogs();
dbController.addFlowerImagesIfNeeded();