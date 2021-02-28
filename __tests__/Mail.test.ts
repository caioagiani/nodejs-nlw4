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
});
