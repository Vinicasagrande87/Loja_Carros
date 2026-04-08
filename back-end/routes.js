const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Importação dos Controllers
const MarcasController = require('./controllers/MarcasController');
const ModelosController = require('./controllers/ModelosController');
const VeiculosController = require('./controllers/VeiculosController');
const FotosController = require('./controllers/FotosController');
const InteressadosController = require('./controllers/InteressadosController');

// --- CONFIGURAÇÃO DO MULTER (UPLOAD DE FOTOS) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // As fotos serão salvas nesta pasta
    },
    filename: (req, file, cb) => {
        // Gera um nome único: timestamp + extensão original (ex: 1712584000.jpg)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// --- ROTAS DE MARCAS ---
router.get('/marcas', MarcasController.index);
router.post('/marcas', MarcasController.create);

// --- ROTAS DE MODELOS ---
router.get('/modelos', ModelosController.index);
router.post('/modelos', ModelosController.create);

// --- ROTAS DE VEÍCULOS ---
router.get('/veiculos', VeiculosController.index);
router.get('/veiculos/:id', VeiculosController.show);
router.post('/veiculos', VeiculosController.create);
router.put('/veiculos/:id', VeiculosController.update);
router.delete('/veiculos/:id', VeiculosController.delete);

// --- ROTAS DE FOTOS (COM UPLOAD) ---
// Rota para listar fotos de um veículo
router.get('/veiculos/:id/fotos', FotosController.index);

// Rota para upload: 'foto' é o nome do campo que virá do celular/front-end
router.post('/veiculos/:id/fotos', upload.single('foto'), FotosController.create);

// --- ROTAS DE INTERESSADOS (LEADS) ---
router.get('/interessados', InteressadosController.index);
router.post('/interessados', InteressadosController.create);

module.exports = router;