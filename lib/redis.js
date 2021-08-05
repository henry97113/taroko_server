const redis = require('redis');
const { promisify } = require('util');
const fs = require('fs');

const client = redis.createClient({
  host: 'redis-16447.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
  port: 16447,
  password: 'xWPUsqvrfIxo9wiATFWGPDtFJzgyJdO2',
});

client.on("error", function(error) {
  console.error(error);
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const dbSize = promisify(client.dbsize).bind(client);
const delAsync = promisify(client.del).bind(client);
const flushall = promisify(client.flushall).bind(client);
const keys = promisify(client.keys).bind(client);

const addContact = async (id, data) => {
  await setAsync(id, JSON. stringify(data));
};

const getContact = async (id) => {
  const contact = await getAsync(id);
  console.log(contact);
  try {
    return JSON.parse(contact);
  } catch (e) {
    return null;
  }
};

const deleteContact = async (id) => {
  const contact = await getAsync(id);
  await delAsync(id);
  return JSON.parse(contact);
};

const resetDB = async () => {
  await flushall();
  const contactsRaw = fs.readFileSync(__dirname + '/db_seed.json');
  const contacts = JSON.parse(contactsRaw);
  Promise.all(contacts.map(async(contact, i) => {
    await setAsync(i + 1, JSON.stringify(contact));
  }));
};

const getNextId = async () => {
  const currentSize = await dbSize();
  return currentSize + 1;
};

const getIds = async () => {
  return await keys('*');
}


module.exports = {
  addContact,
  getContact,
  resetDB,
  getNextId,
  deleteContact,
  getIds,
};