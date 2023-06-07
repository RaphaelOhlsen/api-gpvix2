import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cities - GetById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });
  
  it('Get register by Id', async () => {
    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer
      .get(`/cities/${res.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body).toHaveProperty('name');
  });

  it('Try get register that doesnt exist', async () => {
    const res = await testServer
      .get('/cities/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
