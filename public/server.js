const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express();

const {
  PORT, URL, REACT_APP_PORT, REACT_APP_URL,
} = process.env;
const APP_PORT = REACT_APP_PORT || PORT;
const APP_URL = REACT_APP_URL || URL;
app.use(cors());
app.use('/static', express.static(`${__dirname}/static`));
app.listen(APP_PORT, () => console.log(`Client ready on ${APP_URL}:${APP_PORT}`));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(`${__dirname}/favicon.ico`);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
