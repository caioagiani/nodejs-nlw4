import request from 'supertest';
import { app } from '../../src/app';

const requests = {
  async users(body = {}) {
    const bodyRequest = !Object.keys(body).length
      ? {
          email: 'jest@test.com',
          name: 'Test Jest',
        }
      : body;

    const usersResponse = await request(app).post('/users').send(bodyRequest);

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
  async nps(id: string) {
    const npsResponse = await request(app).get(`/nps/${id}`);

    return npsResponse;
  },
  async answer(note: number, id: string) {
    const answerResponse = await request(app).get(`/answers/${note}?u=${id}`);

    return answerResponse;
  },
};

export { requests };
