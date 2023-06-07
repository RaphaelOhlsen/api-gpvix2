import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Persons - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer
      .post('/signin')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ email, password: '123456' });

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

  it('Get all registers', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphaelgetall@teste.com',
        cityId,
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
