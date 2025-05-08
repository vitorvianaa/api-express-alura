import express from 'express'
import LivroController from '../controllers/livroController.js'
import paginar from '../middlewares/paginar.js'

const routes = express.Router()

routes.get('/livros', LivroController.listarLivros, paginar)
routes.get('/livros/search', LivroController.listarLivroPorFiltro, paginar)
routes.get('/livros/:id', LivroController.listarLivroPorId)

routes.post('/livros', LivroController.criarLivro)

routes.put('/livros/:id', LivroController.atualizarLivro)

routes.delete('/livros/:id', LivroController.deletarLivro)



export default routes