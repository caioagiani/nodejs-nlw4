import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { UUIDv4 } from 'uuid-v4-validator';
import SendMailService from '../../services/SendMailService';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class MailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    if (!UUIDv4.validate(String(survey_id))) {
      return res.status(400).json({
        error: 'UUID is invalid.',
      });
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: 'User does not exists.',
      });
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return res.status(400).json({
        error: 'Survey does not exists.',
      });
    }

    const surveyAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const builderMail = {
      name: user.name,
      to: email,
      subject: survey.title,
      description: survey.description,
      path: npsPath,
      id: '',
      link: `${process.env.SERVER}/answers`,
    };

    if (surveyAlreadyExists) {
      builderMail.id = surveyAlreadyExists.id;

      await SendMailService.execute(builderMail);

      return res.json(surveyAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    builderMail.id = surveyUser.id;

    await SendMailService.execute(builderMail);

    return res.json(surveyUser);
  }
}

export { MailController };
