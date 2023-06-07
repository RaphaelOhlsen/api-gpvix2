import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Persons - UpdateById', () => {
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

  it('Update register', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphaelupdate@teste.com',
        cityId,
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/persons/${res.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Ohlsen',
        email: 'raphaelupdatebyid@teste2.com',
        cityId,
      });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Try to update a resgister that doesnt exist', async () => {
    const res = await testServer
      .put('/persons/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphael@teste.com',
        cityId,
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
