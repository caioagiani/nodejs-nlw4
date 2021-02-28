import request from 'supertest';
import { app } from '../src/app';

import createConnection from '../src/database';

describe('Mail', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create user for relationship survey and sendmail', async () => {
    const userResponse = await request(app).post('/users').send({
      email: 'jest@test.com',
      name: 'Test Jest',
    });

    const surveyResponse = await request(app).post('/surveys').send({
      title: 'Title Jest',
      description: 'Description Jest',
    });

    const { status, body } = await request(app).post('/mail/send').send({
      email: userResponse.body.email,
      survey_id: surveyResponse.body.id,
    });

    expect(status).toBe(200);
    expect(body).toHaveProperty('id');
  });
});
