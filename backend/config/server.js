require('dotenv').config()


const bodyParser = require('body-parser');

const app = require('express')()
            bodyPaserser = require('body-parser'),
            consign = require('consign'),
            cors = require('cors'),
            validator = require('express-validator');

app.use(bodyParser.urlencoded({extended: true}))
   .use(bodyParser.json())
   .use(cors())
   .use(validator())
   .use(require('./router'));


   
consign()
    .include('./app')
    .into(app);

module.exports = app;