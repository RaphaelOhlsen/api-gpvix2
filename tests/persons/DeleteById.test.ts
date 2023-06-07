import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Persons - DeletedById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });

  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const resCity = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Teste' });

    cityId = resCity.body;
  });

  it('Delete register', async () => {
    const res1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphaeldelete@teste.com',
        cityId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer.delete(`/persons/${res1.body}`).send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Try to delete a resgister that doesnt exist', async () => {
    const res = await testServer
      .delete('/persons/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
