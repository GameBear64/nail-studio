/* eslint-disable no-console */
require('dotenv').config({ path: '../../.env' });

//============= API ==============
const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const { normalizeBodyFields, getCookies } = require('./middleware/global');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(getCookies);
app.use(normalizeBodyFields);

require('./routes/_router')(app);

//========= Error Handlers ==========
app.use((_req, res) => res.status(404).json('Route not found, try another method?'));

app.use((error, _req, res, _next) => {
  console.log('[SERVER ERROR]', error);
  res.status(error.status || 500).json(error.message);
});

//===== Listen on port #### =====
app.listen(3031, () => {
  console.log(`Listening on http://localhost:${3031}/`);
});
