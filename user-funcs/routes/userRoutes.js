import express from 'express';
import { User } from '../modules/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
        return res.status(404).send({ message: 'User not found.' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/username/:username', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!user) {
        return res.status(404).send({ message: 'User not found.' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) {
        return res.status(404).send({ message: 'User not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;