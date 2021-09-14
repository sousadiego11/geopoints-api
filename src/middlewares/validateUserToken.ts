import jwt from 'jsonwebtoken';

export const validateUserToken = async (req, res, next): Promise<void> => {
  const token = req.headers.authorization.replace('Bearer', '').trim();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) res.send(err);
    next();
  });
};
