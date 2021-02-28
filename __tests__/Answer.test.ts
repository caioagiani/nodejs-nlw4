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
    const { body, status } = await requests.answer(7, 'invalid_id');

    expect(status).toBe(400);
    expect(body.error).toBe('UUID is invalid.');
  });

  it('should return an error with uuid that does not exists', async () => {
    const { body, status } = await requests.answer(
      7,
      '4a3a83af-b60c-4c44-ab78-4bcc1eb16512',
    );

    expect(status).toBe(400);
    expect(body.error).toBe('SurveyUser does not exists.');
  });
});
