const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {
  readFile,
  addNewTalker,
  editTalker,
  deleteTalker,
  searchTalkerByName,
  } = require('./utils/fsFile');
const { validateLogin } = require('./middlewares/validateLogin');
// const { validateTalkerAdd } = require('./middlewares/validateTalkerAdd');
const { 
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
} = require('./middlewares/validateTalkerAdd');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_UNAUTHORIZED = 401;
const PORT = '3000';

app.get('/talker/search', tokenValidate, async (req, res) => {
  const { q } = req.query;
  if (q === undefined) {
    return res.status(HTTP_OK_STATUS).json(await readFile());
  }
  const searching = await searchTalkerByName(q);
  return res.status(HTTP_OK_STATUS).json(searching);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  res.status(HTTP_OK_STATUS).json(await readFile());
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const specifcTalker = talkers.find((talker) => talker.id === Number(id));
  if (specifcTalker) {
    res.status(HTTP_OK_STATUS).json(specifcTalker);
  } else {
    res.status(HTTP_NOT_FOUND_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validateLogin, (_req, res) => {
  // const crypto = require('crypto');
  const token = crypto.randomBytes(8).toString('hex');
  // console.log(token);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
  async (req, res) => {
  const addedTalker = req.body;
  const id = await addNewTalker(addedTalker);
  res.status(HTTP_CREATED_STATUS).json(id);
});

app.put('/talker/:id',
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talker = await editTalker(Number(id), {
      name,
      age,
      talk,
    });
  res.status(HTTP_OK_STATUS).json(talker);
});

app.delete('/talker/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(HTTP_NO_CONTENT).end();
});

app.listen(PORT, () => {
  console.log('Estou online');
});

module.exports = app;
