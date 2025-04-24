import express from 'express'
import conectaBanco from './config/dbConnect.js'
import routes from './routers/index.js'

import manipuladorDeErros from './middlewares/manipuladorDeErros.js'
import manipulador404 from './middlewares/manipulador404.js'

const banco = await conectaBanco()

banco.on('error', (error) => {
    console.error('erro de conexão: ', error)
})

banco.once('open', () => {
    console.log('conexão feita com sucesso...')
})

const app = express()
routes(app)

app.use(manipulador404)

app.use(manipuladorDeErros)


export default app;