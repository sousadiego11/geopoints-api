import express from 'express';
import { createUserService } from '../service';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUserService({ name, email, password });
    res.status(201).send({ name, email, password }).status(201);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { router };
