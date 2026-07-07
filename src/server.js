import express from 'express';
import { connectedDB } from './config/database.js';
import quotesrouter from './routes/quotes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/quotes', quotesrouter)

await connectedDB();

app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.listen(5000, () => {
    console.log('Server running on Port 5000');
});