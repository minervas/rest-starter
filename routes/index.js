const express = require('express');
const { hsetAsync, hgetAsync, hdelAsync } = require('../redis');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// ===^ generated

router.post('/item', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send({ error: 'must include item id' });
  await hsetAsync('items', id, JSON.stringify(req.body));
  return res.json(req.body);
});

router.get('/item/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: 'must include item id' });
  const item = await hgetAsync('items', id);
  return res.json(JSON.parse(item));
});

router.delete('/item/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: 'must include item id' });
  await hdelAsync('items', id);
  return res.json({});
});

module.exports = router;
