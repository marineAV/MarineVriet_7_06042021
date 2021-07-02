const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path')
const helmet = require('helmet'); // Protection des en-têtes HTTP
const db = require('./models/index')

const app = express();
 
db.sequelize.sync() 

const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');
const profileRoutes = require('./routes/profile')
const postRoutes = require('./routes/post');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Verbe que l'on autorise
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', userRoutes);
app.use('/api', fileRoutes);
app.use('/api', profileRoutes);
app.use('/api', postRoutes);
app.use('/files', express.static(path.join(__dirname, 'files'))); 

module.exports = app;  