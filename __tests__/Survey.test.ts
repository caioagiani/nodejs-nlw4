import { requests } from './utils/requests';

import createConnection from '../src/database';

describe('Survey', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create a new survey', async () => {
    const { body, status } = await requests.surveys();

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should get all surveys', async () => {
    const { body, status } = await requests.surveysAll();

    expect(status).toBe(200);
    expect(body.length).toBe(1);
  });
});
