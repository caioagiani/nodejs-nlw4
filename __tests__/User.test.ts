import createConnection from '../src/database';
import { requests } from './utils/requests';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should create a new user', async () => {
    const { body, status } = await requests.users();

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not create a user with an existing email', async () => {
    const { status } = await requests.users();

    expect(status).toBe(400);
  });
});
