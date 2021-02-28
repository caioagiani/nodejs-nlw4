import request from 'supertest';
import { app } from '../src/app';
import { requests } from './utils/requests';

import createConnection from '../src/database';

describe('Answer', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should receive survey note', async () => {
    const sendMailResponse = await requests.sendMail();

    const { status, body } = await request(app).get(
      `/answers/7?u=${sendMailResponse.body.id}`,
    );

    expect(status).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body.value).toBe(7);
  });

  it('should return an error when receive survey note', async () => {
    const { status } = await request(app).get('/answers/7?u=invalid_id');

    expect(status).toBe(400);
  });
});
