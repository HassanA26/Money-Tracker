const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  })();

app.get('/api/test', (req, res) => {
    res.json('test okay');
});

app.post('/api/transaction', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const{name,description,date,price} = req.body;
    const transaction = await Transaction.create({
        name,description,date,price
    });
    res.json(transaction);
});

app.get('/api/transactions', async(req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(port);
// tlCGDIHXnIOpSoqY