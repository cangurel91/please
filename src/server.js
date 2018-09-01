const express = require('express');
const path = require('path');
const app = express();


app.use('/build/static', express.static(path.join(__dirname, 'build/static')));

app.listen(9000);
