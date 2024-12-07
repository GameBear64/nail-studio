/* eslint-disable no-console */
const express = require('express');
require('express-async-errors');
// require('./toolbox/routeGrouper')(express);
const app = express();

require('dotenv').config({ path: '../../.env' });

//============= API ==============
const cors = require('cors');
const { normalizeBodyFields, getCookies } = require('./middleware/global');

app.use(cors());
app.use(express.json());
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
app.listen(process.env.VITE_SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.VITE_SERVER_PORT}/`);
});
