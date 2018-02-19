'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));

// TODO : integrate DB
// Postgres : https://www.npmjs.com/package/pg
// mysql : https://www.npmjs.com/package/mysql

app.get('/test', (req, res) => {
    res.status(200).json([
        {content: 'Bonjour, c\'est Rémi !'},
        {content: 'Enchangé Rémi, moi c\'est Fabien ;)'},
    ]);
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
});