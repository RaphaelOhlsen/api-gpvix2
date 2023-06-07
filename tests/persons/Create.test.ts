import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - Create', () => {
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
  it('Create register', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphael@teste.com',
        cityId,
      });

    expect(res.status).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Cant create a register with short fullName', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Ra',
        email: 'raphael@teste.com',
        cityId,
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
  });
  it('Cant create a register with invalid email', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphael te.com',
        cityId,
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Cant create a register with invalid cityId', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphael te.com',
        cityId: 1.5,
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cityId');
  });
  it('Cant create a register without fullName', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: 'raphael@teste.com',
        cityId,
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
  });
  it('Cant create a register without email', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        cityId,
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Cant create a register without cityId', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Raphael Bernardo Ohlsen',
        email: 'raphael@teste.com',
      });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cityId');
  });
  it('Cant create a register without any property', async () => {
    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cityId');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.fullName');
  });
  it('Cant create 2 registers with same email', async () => {
    const res1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: 'Raphael',
        email: 'raphael1@teste.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'RaphaelOhlsen',
        email: 'raphael1@teste.com',
        cityId,
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });
});
