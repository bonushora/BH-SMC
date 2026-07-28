require("dotenv").config();

const express = require('express');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const routes = require('./routes');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter
});


const app = express();


app.use(express.json());

app.use(cors());


app.use('/api', routes(prisma));


module.exports = app;
