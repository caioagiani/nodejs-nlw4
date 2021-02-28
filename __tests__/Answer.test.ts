import request from 'supertest';
import { app } from '../src/app';
import { requests } from './utils/requests';

import createConnection from '../src/database';

describe('Answer', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should receive a response with the survey note', async () => {
    const sendMailResponse = await requests.sendMail();

    const { status, body } = await request(app).get(
      `/answers/7?u=${sendMailResponse.body.id}`,
    );

    expect(status).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body.value).toBe(7);
  });
});
