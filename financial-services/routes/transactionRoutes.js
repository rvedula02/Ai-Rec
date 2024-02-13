import express from 'express';
import Transaction from '../modules/transaction.js';

const router = express.Router();

router.post('/transactions', async (req, res) => {
  console.log("here");
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    fetch('http://localhost:3004/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'TransactionCreated', data: { userId: req.body.userId, transaction } })
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/transactions/:transactionId', async (req, res) => {
  try {
      const transaction = await Transaction.findById(req.params.transactionId);
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(transaction);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.put('/transactions/:transactionId', async (req, res) => {
  try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
          req.params.transactionId,
          req.body,
          { new: true }
      );
      if (!updatedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(updatedTransaction);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.delete('/transactions/:transactionId', async (req, res) => {
  try {
      const deletedTransaction = await Transaction.findByIdAndDelete(req.params.transactionId);
      if (!deletedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

export default router;
