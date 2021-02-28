import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UUIDv4 } from 'uuid-v4-validator';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    if (!UUIDv4.validate(String(u))) {
      return res.status(400).json({
        error: 'UUID is invalid.',
      });
    }

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return res.status(400).json({
        error: 'SurveyUser does not exists.',
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
