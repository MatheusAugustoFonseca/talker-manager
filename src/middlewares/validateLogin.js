// o campo email é obrigatório;
// o campo email deve ter um email válido;
// o campo password é obrigatório;
// o campo password deve ter pelo menos 6 caracteres.

const validateEmail = (email, res) => {
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email)) {   
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
   return null;
};

const validatePassword = (password, res) => {
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // const ve = validateEmail(email, res);
  validateEmail(email, res);
  // if (ve !== null) return ve;
  // const vp = validatePassword(password, res);
  // if (vp !== null) return vp;
  validatePassword(password, res);
  next();
};

module.exports = { validateLogin };