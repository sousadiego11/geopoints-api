import bodyParser from 'body-parser';
import express from 'express';
import { createUserService } from '../service';

export const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/users', jsonParser, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUserService({ name, email, password });
    res.status(201).send({ name, email, password }).status(201);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
