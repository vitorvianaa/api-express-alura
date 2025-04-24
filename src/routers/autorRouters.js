import express from 'express'
import AutorController from '../controllers/autorController.js'

const routes = express.Router()

routes.get('/autores', AutorController.listarAutores)

routes.get('/autores/:id', AutorController.listarAutorPorID)

routes.put('/autores/:id', AutorController.atualizarAutor)

routes.post('/autores', AutorController.criarAutor)

routes.delete('/autores/:id', AutorController.deletarAutor)

export default routes