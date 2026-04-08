const express = require('express');
const router = express.Router();

const MarcasController = require('./controllers/MarcasController');
const ModelosController = require('./controllers/ModelosController');
const VeiculosController = require('./controllers/VeiculosController');
const FotosController = require('./controllers/FotosController');
const InteressadosController = require('./controllers/InteressadosController');

// Marcas
router.get('/marcas', MarcasController.index);
router.post('/marcas', MarcasController.create);

// Modelos
router.get('/modelos', ModelosController.index);
router.post('/modelos', ModelosController.create);

// Veículos
router.get('/veiculos', VeiculosController.index);
router.get('/veiculos/:id', VeiculosController.show);
router.post('/veiculos', VeiculosController.create);
router.put('/veiculos/:id', VeiculosController.update);
router.delete('/veiculos/:id', VeiculosController.delete);

// Fotos
router.get('/veiculos/:id/fotos', FotosController.index);
router.post('/fotos', FotosController.create);

// Interessados
router.get('/interessados', InteressadosController.index);
router.post('/interessados', InteressadosController.create);

module.exports = router;