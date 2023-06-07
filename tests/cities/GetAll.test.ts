import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cities - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });

  it('Get all registers', async () => {
    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
