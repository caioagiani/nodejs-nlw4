import request from 'supertest';
import { app } from '../../src/app';

const requests = {
  async users() {
    const usersResponse = await request(app).post('/users').send({
      email: 'jest@test.com',
      name: 'Test Jest',
    });

    return usersResponse;
  },
  async surveys() {
    const surveysResponse = await request(app).post('/surveys').send({
      title: 'Title Jest',
      description: 'Description Jest',
    });

    return surveysResponse;
  },
  async surveysAll() {
    const surveysAllResponse = await request(app).get('/surveys');

    return surveysAllResponse;
  },
  async sendMail(body = {}) {
    const userResponse = await this.users();
    const surveyResponse = await this.surveys();

    const bodyRequest = !Object.keys(body).length
      ? {
          email: userResponse.body.email,
          survey_id: surveyResponse.body.id,
        }
      : body;

    const sendMailResponse = await request(app)
      .post('/mail/send')
      .send(bodyRequest);

    return sendMailResponse;
  },
};

export { requests };