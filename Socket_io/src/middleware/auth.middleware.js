const authMiddleware = (req, res, next) => {
  const { age } = req.body;
  if (age < 18) {
    return res
      .status(401)
      .json({ message: 'Tiene que ser mayor de 18 para entrar.' });
  }
  next();
};
export default authMiddleware;
