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

  it('should return an error when sending email with invalid uuid', async () => {
    const userResponse = await requests.users({
      email: 'uuid@gmail.com',
      name: 'invalid uuid',
    });

    const { body, status } = await requests.sendMail({
      email: userResponse.body.email,
      survey_id: 'invalid_uuid',
    });

    expect(status).toBe(400);
    expect(body.error).toBe('UUID is invalid.');
  });

  it('should return an error when sending email with invalid email', async () => {
    const surveyResponse = await requests.surveys();

    const { body, status } = await requests.sendMail({
      email: 'invalid_email',
      survey_id: surveyResponse.body.id,
    });

    expect(status).toBe(400);
    expect(body.error).toBe('User does not exists.');
  });

  it('should return an error when sending email with invalid survey', async () => {
    const userResponse = await requests.users({
      email: 'survey@gmail.com',
      name: 'invalid survey',
    });

    const { body, status } = await requests.sendMail({
      email: userResponse.body.email,
      survey_id: '4a3a83af-b60c-4c44-ab78-4bcc1eb16512',
    });

    expect(status).toBe(400);
    expect(body.error).toBe('Survey does not exists.');
  });
});
