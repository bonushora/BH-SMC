require("dotenv").config();

const express = require('express');
const cors = require('cors');

const prisma = require('./database/prisma');

const routes = require('./routes');


const app = express();


app.use(express.json());

app.use(cors());


app.use('/api', routes(prisma));


module.exports = app;
