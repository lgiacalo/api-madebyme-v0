/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();
// Route: <HOST>:PORT/api/users/

router.get('/', (req, res) => {
  
  console.log('/get:', {req, res});
  res.json({ success: true });
});


router.post('/', (req, res) => {
  
  console.log('/post:', {req, res});
  res.json({ success: true });
});

router.get('/submit', (req, res) => {
  
  console.log('/get:', {req, res});
  res.json({ success: true });
});


router.post('/submit', (req, res) => {
  
  console.log('/post:', {req, res});
  res.json({ success: true });
});

export default router;