const express = require ('express');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const authController = require('./controllers/authController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');

routes.post('/register', authController.register );
routes.post('/authenticate', authController.authenticate );

routes.get('/list', authMiddleware, listController.list);
routes.get('/list/show/:id', authMiddleware, listController.show);
routes.post('/list/store', authMiddleware, listController.store);
routes.put('/list/update/:id', authMiddleware, listController.update);
routes.delete('/list/remove/:id', authMiddleware, listController.destroy);

routes.get('/card/created', authMiddleware, cardController.listCreated);
routes.get('/card/list/:listid', authMiddleware, cardController.list);
routes.get('/card/show/:id', authMiddleware, cardController.show);
routes.post('/card/store', authMiddleware, cardController.store);
routes.post('/card/move', authMiddleware, cardController.moveCard);
routes.delete('/card/remove/:id', authMiddleware, cardController.destroy);

module.exports = routes;