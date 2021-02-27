import { Router } from 'express';
import { UserController } from './app/controllers/UserController';
import { SurveyController } from './app/controllers/SurveyController';
import { MailController } from './app/controllers/MailController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const mailController = new MailController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/mail/send', mailController.execute);

export { router };
