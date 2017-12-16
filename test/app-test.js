const expect = require('chai').expect;
const request = require('supertest');
const app = require('../src/app');

describe('express app', () => {
  it('handles a GET request to /api', async () => {
    const res = await request(app).get('/api');
    expect(res.body).to.deep.equals({ hi: 'there' });
  });
});
