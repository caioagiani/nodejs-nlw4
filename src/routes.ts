import { Router } from 'express';
import { UserController } from './app/controllers/UserController';
import { SurveyController } from './app/controllers/SurveyController';
import { MailController } from './app/controllers/MailController';
import { AnswerController } from './app/controllers/AnswerController';
import { NpsController } from './app/controllers/NpsController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const mailController = new MailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/mail/send', mailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute);

export { router };
