import express from 'express'
import livros from './livroRouters.js'
import autors from './autorRouters.js'


const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Curso de Node.js'))

    app.use(express.json(), livros, autors)
} 

export default routes