import express from 'express';
// import { ILoginUser } from '../data/repositories/ILoginUser';
import { createUserService } from '../service';
import { loginUserService } from '../service/loginUserService';

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

router.post('/users/login', async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const isValidPassword = await loginUserService({ email, password });
    res.status(200).send({ mensagem: isValidPassword });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

export { router };
