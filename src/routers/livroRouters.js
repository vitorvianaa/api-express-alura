import express from 'express'
import LivroController from '../controllers/livroController.js'

const routes = express.Router()

routes.get('/livros', LivroController.listarLivros)
routes.get('/livros/search', LivroController.listarLivroPorFiltro)
routes.get('/livros/:id', LivroController.listarLivroPorId)

routes.post('/livros', LivroController.criarLivro)

routes.put('/livros/:id', LivroController.atualizarLivro)

routes.delete('/livros/:id', LivroController.deletarLivro)



export default routes