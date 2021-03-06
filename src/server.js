const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production' //Saber se está em ambiente de produção ou não

    this.middlewares()
    this.views()
    this.routes()
  }
  middlewares() {
    this.express.use(express.urlencoded({ extended: false })) //Lidar com formulários
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret', //Serve para criptografar a sessão
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'temp', 'sessions'),
        }),
        saveUninitialized: true,
      })
    )
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      //__dirname = Identifica diretório do server.js 'src'
      //'app', 'view' = Indica onde estará a pasta com as Views
      watch: this.isDev,
      express: this.express,
      autoescape: true,
    })
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes() {
    this.express.use(require('./routes'))
    //Criou um arquivo separado para armazenar no ./routes
  }
}

module.exports = new App().express //Exportou uma instancia da classe app 'new'
