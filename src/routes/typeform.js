import express from 'express';
import fs from 'fs';
import { handleSubmitTypeform } from '../func/handleTypeform.js';

const router = express.Router();


router.get('/', (req, res) => {
  
  console.log('/get:', { url: req.url, query: req.query });
  res.json({ success: true });
});


router.post('/', (req, res) => {
  
  console.log('/post:', {req, res});
  res.json({ success: true });
});


router.post('/submit', (req, res) => {
  console.log('post: /submit', req.url);
  const { query: { typeform }, body } = req;
  
  if (req?.body?.event_id){
    fs.writeFileSync(`cache/responses/${req?.body?.event_id}.json`, JSON.stringify(req.body, null, 4));
  }

  handleSubmitTypeform(typeform, body);
  res.json({ success: true });
});


export default router;