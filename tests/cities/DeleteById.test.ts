import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Cities - DeletedById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });

  it('Delete register', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Try to delete a resgister that doesnt exist', async () => {
    const res = await testServer
      .delete('/cities/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
