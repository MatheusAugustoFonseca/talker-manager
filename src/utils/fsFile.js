const fs = require('fs').promises;
const { writeFile } = require('fs').promises;
// const fs = require('fs/promises');
const { join } = require('path');

const dirPath = join(__dirname, '../talker.json');

const readFile = async () => {
  const response = await fs.readFile(join(__dirname, '../talker.json'), 'utf-8');
  const dataList = JSON.parse(response);
  // console.log(dataList);
  return dataList;
};

const addNewTalker = async (add) => {
  const talkers = await readFile();
  const id = Number(talkers[talkers.length - 1].id) + 1;
  const newTalker = {
    id,
    ...add,
  };
  talkers.push(newTalker);
  await writeFile(dirPath, JSON.stringify(talkers, null, 2));
  return newTalker;
};

const editTalker = async (id, talker) => {
  const talkers = await readFile();
  const index = talkers.findIndex((speaker) => speaker.id === id);
  talkers[index] = {
    id,
    ...talker,
  };
  await writeFile(dirPath, JSON.stringify(talkers, null, 2));
  return talkers[index]; 
};

const deleteTalker = async (_req, id) => {
  const talkers = await readFile();
  // const idParam = req.params.id;
  const index = talkers.findIndex((speaker) => speaker.id === id);
  talkers.splice(index, 1);
  await writeFile(dirPath, JSON.stringify(talkers, null, 2));
  return talkers;
};

const searchTalkerByName = async (nameInputed) => {
  const talkers = await readFile();
  const search = talkers.filter((talker) => talker.name.includes(nameInputed));
  return search;
};

module.exports = { readFile, addNewTalker, editTalker, deleteTalker, searchTalkerByName };