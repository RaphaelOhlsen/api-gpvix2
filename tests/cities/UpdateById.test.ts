import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cities - UpdateById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });

  it('Update register', async () => {
    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cities/${res.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra 2' });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Try to update a resgister that doesnt exist', async () => {
    const res = await testServer
      .put('/cities/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra 2' });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
