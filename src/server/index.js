import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import typeform from '../routes/typeform.js';
// import test from '../routes/test.js';


// Instantiate express
const server = express();

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/typeform', typeform);
// server.use('/api/test', test);

export default server;
