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

module.exports = { readFile, addNewTalker };