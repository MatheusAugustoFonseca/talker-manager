const fs = require('fs').promises;
// const fs = require('fs/promises');
const { join } = require('path');

const readFile = async () => {
  const response = await fs.readFile(join(__dirname, '../talker.json'), 'utf-8');
  const dataList = JSON.parse(response);
  // console.log(dataList);
  return dataList;
};

module.exports = { readFile };