import jwt from 'jsonwebtoken';

export const authentication = async (req, res, next): Promise<void> => {
  const token = req.get('authorization').replace('Bearer ', '').trim();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.status(401).send({ error: 'Please authenticate.' });
    } else {
      req.token = token;
      next();
    }
  });
};
