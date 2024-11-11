// server.js
import express from 'express';
import pkg from 'pg';
import fileUpload from 'express-fileupload';
import routes from './routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
  });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(fileUpload());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});