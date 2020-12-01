
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const hgetAsync = promisify(client.hget).bind(client);

const hsetAsync = promisify(client.hset).bind(client);

const hdelAsync = promisify(client.hdel).bind(client);

module.exports = {
  client, hgetAsync, hsetAsync, hdelAsync,
};
