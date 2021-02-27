import request from 'supertest';
import { app } from '../src/app';

import createConnection from '../src/database';

describe('Survey', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Jest',
      description: 'Description Jest',
    });

    const { status, body } = response;

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should get all surveys', async () => {
    const response = await request(app).get('/surveys');

    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.length).toBe(1);
  });
});
