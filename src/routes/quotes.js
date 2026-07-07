import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

router.get('/random', async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const quote = await Quote.findOne().skip(random);
  res.json(quote);
});

router.post('/seed', async (req, res) => {
  try {
    const quotes = req.body.quotes;
    if (!Array.isArray(quotes) || quotes.length === 0) {
      return res.status(400).json({ error: 'Invalid seed data. Provide a non-empty array in request body.quotes.' });
    }

    await Quote.deleteMany({});
    await Quote.insertMany(quotes);
    res.json({ seeded: true, count: quotes.length });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed quotes.', details: error.message });
  }
});

export default router;