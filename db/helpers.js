const fs = require('fs');

const rawdata = fs.readFileSync(__dirname + '/contacts.json');


const getContacts = (data = rawdata) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const writeContacts = (contacts) => fs.writeFileSync(__dirname + '/contacts.json', JSON.stringify(contacts));

const resetContacts = () => {
  const seeds = fs.readFileSync(__dirname + '/db_seed.json');
  return writeContacts(getContacts(seeds));
};

module.exports = {
  getContacts,
  writeContacts,
  resetContacts,
};