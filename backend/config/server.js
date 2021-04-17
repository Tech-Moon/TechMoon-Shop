require('dotenv').config();

const app = require('express')(),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    cors = require('cors'),
    validator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .use(validator());

consign()
    .include('./app/routes')
    .then('./config/database.js')
    .then('./app/controllers')
    .then('./app/repositories')
    .into(app);

module.exports = app;
