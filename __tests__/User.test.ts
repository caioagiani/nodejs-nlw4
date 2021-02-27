import request from 'supertest';
import { app } from '../src/app';

import createConnection from '../src/database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'jest@test.com',
      name: 'Test Jest',
    });

    const { status, body } = response;

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });
});
