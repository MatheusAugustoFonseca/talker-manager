// const tokenValidate = (authorization, res, next) => {
  const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidate = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidate = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidate = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const DATE_REGEX = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!DATE_REGEX.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// const validateTalkerAdd = async (req, res, next) => {
//   const { authorization } = req.header;
//   const { name, age, talk } = req.body;
//   tokenValidate(authorization, res);
//   nameValidate(name, res);
//   ageValidate(age, res);
//   talkValidate(talk, res);
//   watchedAtValidate(talk.watchedAt, res);
//   rateValidate(talk.rate, res);
//   next();
// };

// module.exports = { validateTalkerAdd };

module.exports = { 
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
 };