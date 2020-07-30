require('dotenv').config()

const server = require(`./api/server.js`);

const PORT = process.env.PORT || 33567;

server.listen(PORT, () => {
  console.log(`tucker..Im Listening on PORT ${PORT}...`);
});
