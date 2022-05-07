const express = require('express');
const dotenve = require('dotenv');
const app = express();
dotenve.config({ path: './config.env' });
require('./mongoConnect/connection.js');
const PORT = process.env.PORT;
app.use(express.json());
app.use(require('./router/auth'));
app.get('/', (req, res, next) => {
    res.send('<h1>welcome to secret page<h1>');
});
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
