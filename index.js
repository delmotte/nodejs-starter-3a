'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {Client} = require('pg');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));


const client = new Client({
    connectionString: '<enter your postgres url here>'
});

app.get('/hello-world', async (req, res) => {
    try {

        const result = await client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(result.rows[0].message);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// TODO : integrate DB
// Postgres : https://www.npmjs.com/package/pg
// mysql : https://www.npmjs.com/package/mysql

app.get('/change-this-route-name-please', (req, res) => {
    res.status(200).json([
        {id: 1, content: 'Évènement 1'},
        {id: 2, content: 'Évènement 2'}
    ]);
});

client
    .connect()
    .then(() => {
        console.log('[' + new Date().toISOString() + '] Connect to Postgres OK ');
        const server = app.listen(process.env.PORT || 3000, () => {
            console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
        });
    })
    .catch(err => {
        console.log(err);
    });