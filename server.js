const express = require("express");
const requireDir = require ('require-dir');
const cors = require('cors');

require('./src/database');

const app = express();
app.use(express.json());

app.use(cors());

requireDir('./src/app/models');

app.use('/kanban', require('./src/app/routes'));

app.listen(3001);