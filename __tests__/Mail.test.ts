import createConnection from '../src/database';
import { requests } from './utils/requests';

describe('Mail', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create user for relationship survey and sendmail', async () => {
    const { status, body } = await requests.sendMail();

    expect(status).toBe(200);
    expect(body).toHaveProperty('id');
  });

  it('should return an error when sending email with invalid parameters', async () => {
    const { status } = await requests.sendMail({
      email: 'invalid',
      survey_id: 'invalid',
    });

    expect(status).toBe(400);
  });
});
