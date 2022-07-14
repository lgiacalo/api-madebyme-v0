import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import server from './server/index.js';

const { PORT } = process.env;

http.createServer({}, server)
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
