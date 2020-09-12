if (process.env.NODE_ENV === "development"){
    require('dotenv').config();
}

const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

var server = app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
