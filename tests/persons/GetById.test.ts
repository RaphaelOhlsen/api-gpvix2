import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Persons - GetById', () => {
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

  it('Get register by Id', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphaelgetbyid@teste.com',
        cityId,
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer
      .get(`/persons/${res.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body).toHaveProperty('fullName');
    expect(resGet.body).toHaveProperty('email');
    expect(resGet.body).toHaveProperty('cityId');
  });

  it('Try get register that doesnt exist', async () => {
    const res = await testServer
      .get('/persons/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
