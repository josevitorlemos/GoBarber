const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController') //Controller autenticação de usuário

routes.get('/', SessionController.create) //Cria rota de autenticação do usuário
routes.post('/signin', SessionController.store) //Processo de login

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
