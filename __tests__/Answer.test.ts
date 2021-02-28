import createConnection from '../src/database';
import { requests } from './utils/requests';

describe('Answer', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should receive survey note', async () => {
    const sendMailResponse = await requests.sendMail();

    const { status, body } = await requests.answer(7, sendMailResponse.body.id);

    expect(status).toBe(200);
    expect(body.value).toBe(7);
    expect(body).toHaveProperty('id');
  });

  it('should return an error when receive survey note', async () => {
    const { status } = await requests.answer(7, 'invalid_id');

    expect(status).toBe(400);
  });
});
