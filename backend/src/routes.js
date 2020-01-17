const { Router } = require('express');
const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.post('/devs', DevController.store);
routes.post('/devs/:id', DevController.update);
routes.get('/devs', DevController.index);
routes.get('/devs', DevController.show);
routes.delete("/devs", DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
