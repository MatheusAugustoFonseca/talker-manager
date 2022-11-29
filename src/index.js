const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile } = require('./utils/fsFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

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
  // const specifcTalker = talkers.find(({ id }) => id === Number(id));
  const specifcTalker = talkers.find((talker) => talker.id === Number(id));
  if (specifcTalker) {
    res.status(HTTP_OK_STATUS).json(specifcTalker);
  } else {
    res.status(HTTP_NOT_FOUND_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', async (_req, res) => {
  // const crypto = require('crypto');
  const token = crypto.randomBytes(8).toString('hex');
  // console.log(token);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Estou online');
});

module.exports = app;
