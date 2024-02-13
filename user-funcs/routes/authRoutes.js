import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../modules/user.js';
import { token } from 'morgan';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const user = new User({ username, name, email, password });
    await user.save();
    fetch('http://localhost:3004/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'UserCreated', data: { userId: user._id, username } })
    });
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    fetch('http://localhost:3004/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'UserLogin', data: { userId: user._id, username } })
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;