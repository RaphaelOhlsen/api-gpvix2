import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - SignUp', () => {
  it('Try signUp with valid data', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Try signUp with invalid email', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphaelteste.com',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Try signUp with email less than 6 characters', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'er@w',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Try signUp without email', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
  it('Try signUp with name less than 3 characters', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Ra',
      email: 'raphael@teste.com',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
  });
  it('Try signUp without name', async () => {
    const res = await testServer.post('/signup').send({
      email: 'raphael@teste.com',
      password: '123456',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
  });
  it('Try signUp without password', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.password');
  });
  it('Try signUp with password less than 6 characters', async () => {
    const res = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphael@teste.com',
      password: '12345',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.password');
  });
  it('Try signup with duplicate email', async () => {
    const res1 = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphaelduplicado@teste.com',
      password: '123456',
    });

    expect(res1.status).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer.post('/signup').send({
      name: 'Raphael',
      email: 'raphaelduplicado@teste.com',
      password: '1234567',
    });

    expect(res2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });
});
