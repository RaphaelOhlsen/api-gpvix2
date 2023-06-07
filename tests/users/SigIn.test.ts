import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Users - SignIn', () => {
  beforeAll(async () => {
    await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
      password: '123456'
    });
  });
  
  it('Try signIn with valid data', async () => {
    const res = await testServer.post('/signin').send({
      email: 'raphael@teste.com',
      password: '123456'
    });

    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('Try signIn with invalid password', async () => {
    const res = await testServer.post('/signin').send({
      email: 'raphael@teste.com',
      password: '1234567'
    });

    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Try signIn with invalid email', async () => {
    const res = await testServer.post('/signin').send({
      email: 'raphael2@teste.com',
      password: '123456'
    });

    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Try signIn with invalid user', async () => {
    const res = await testServer.post('/signin').send({
      email: 'raphael2@teste.com',
      password: '123456'
    });

    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Try signIn with invalid email', async () => {
    const res = await testServer.post('/signin').send({
      name: 'Raphael',
      email: 'raphaelteste.com',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Try signIn with email less than 6 characters', async () => {
    const res = await testServer.post('/signin').send({
      name: 'Raphael',
      email: 'er@w',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Try signIn with password less than 6 characters', async () => {
    const res = await testServer.post('/signin').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
      password: '12345',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.password');
  });
  it('Try signIn without password', async () => {
    const res = await testServer.post('/signin').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.password');
  });
  it('Try signIn without email', async () => {
    const res = await testServer.post('/signin').send({
      name: 'Raphael',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
});