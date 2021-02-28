import createConnection from '../src/database';
import { requests } from './utils/requests';

describe('Nps', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should calculate survey nps', async () => {
    const surveyResponse = await requests.surveys();

    const { status, body } = await requests.nps(surveyResponse.body.id);

    expect(status).toBe(200);
    expect(body).toHaveProperty('nps');
  });

  it('should return an error when calculate nps', async () => {
    const { status } = await requests.nps('invalid_id');

    expect(status).toBe(400);
  });
});
