import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import typeform from '../routes/typeform.js';


// Instantiate express
const server = express();

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/typeform', typeform);

export default server;
