const cors = require('cors');

const { ALLOWED_ORIGINS } = process.env;
const origin = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(';') : [];

module.exports = cors({
  origin,
});
