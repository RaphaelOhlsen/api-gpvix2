import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'createcity@gmail.com';
    await testServer.post('/signup').send({ name: 'Teste', email, password: '123456' });
    const signinRes = await testServer.post('/signin').send({ email, password: '123456' });

    accessToken = signinRes.body.accessToken;
  });

  it('Try Create register without access token', async () => {
    const res = await testServer.post('/cities').send({ name: 'Serra' });

    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Create register', async () => {
    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Serra' });

    expect(res.status).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Cant create a register with short name', async () => {
    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Se' });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
  });
});
