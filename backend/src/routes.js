const { Router } = require('express');
const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.post('/devs/:id', DevController.update);
routes.get('/devs', DevController.index);
routes.get('/devs', DevController.show);
routes.delete("/devs", DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
