
const request = require('supertest');
const { client } = require('./redis');
const server = require('./app');


afterAll(() => {
  client.quit();
  server.close();
});

describe('item', () => {
  it('should be able to post an item', async () => {
    const item = { a: 'test', id: '1' };
    const res = await request(server)
      .post('/item')
      .set('Content-Type', 'application/json')
      .send(item);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
  });
  it('should be able to get an item', async () => {
    // setup
    const item = { a: 'test', id: '1' };
    await request(server)
      .post('/item')
      .set('Content-Type', 'application/json')
      .send(item);

    const res = await request(server)
      .get(`/item/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
  });

  it('should be able to delete an item', async () => {
    // setup
    const item = { a: 'test', id: '1' };
    await request(server)
      .post('/item')
      .set('Content-Type', 'application/json')
      .send(item);

    const res = await request(server)
      .delete(`/item/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});

    const delRes = await request(server)
      .get(`/item/${item.id}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body).toEqual(null);
  });
});
