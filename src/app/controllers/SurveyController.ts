import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surverysRepository = getCustomRepository(SurveysRepository);

    const survey = surverysRepository.create({ title, description });

    await surverysRepository.save(survey);

    return res.status(201).json(survey);
  }

  async show(_req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveyRepository.find();

    return res.json(allSurveys);
  }
}

export { SurveyController };
