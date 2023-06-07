import { Router } from 'express';

import { CitiesController, PersonsController, UsersController } from '../controllers';
import { ensureAuthenticated, ensureAuthorized } from '../shared/middlewares';


const router = Router();

router.get('/', (_, res) => {
  return res.send('API GPVIX');
});

/* Cities */

router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);

router.get('/cities/:id', ensureAuthenticated ,CitiesController.getByIdValidation, CitiesController.getById);

router.post('/cities', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']), CitiesController.createValidation, CitiesController.create);

router.put('/cities/:id', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']), CitiesController.updateByIdValidation, CitiesController.updateById);

router.delete('/cities/:id', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']), CitiesController.deleteByIdValidation, CitiesController.deleteById);


/* Persons */
router.get('/persons', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']), PersonsController.getAllValidation, PersonsController.getAll);

router.get('/persons/:id', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']),PersonsController.getByIdValidation, PersonsController.getById);

router.post('/persons', ensureAuthenticated,  ensureAuthorized(['sadmin', 'admin']), PersonsController.createValidation, PersonsController.create);

router.put('/persons/:id', ensureAuthenticated, ensureAuthorized(['sadmin', 'admin']), PersonsController.updateByIdValidation, PersonsController.updateById);

router.delete('/persons/:id', ensureAuthenticated,  ensureAuthorized(['sadmin', 'admin']), PersonsController.deleteByIdValidation, PersonsController.deleteById);


/* Users */
router.get('/users', ensureAuthenticated, ensureAuthorized(['sadmin']), UsersController.getAllValidation, UsersController.getAll);

router.post('/users', ensureAuthenticated, UsersController.CreateValidation, UsersController.create);

router.get('/users/:id', ensureAuthenticated, ensureAuthorized(['sadmin']), UsersController.getByIdValidation, UsersController.getById);

router.put('/users/:id', ensureAuthenticated, ensureAuthorized(['sadmin']), UsersController.updateByIdValidation, UsersController.updateById);

router.delete('/users/:id', ensureAuthenticated, ensureAuthorized(['sadmin']), UsersController.deleteByIdValidation, UsersController.deleteById);


router.post('/signin', UsersController.signInValidation, UsersController.signIn);
router.post('/signup', UsersController.signUpValidation, UsersController.signUp);

export { router };
