import NaoEncontrado from "../erros/NaoEncontrado.js"
import { autor } from "../models/index.js"

class AutorController{

    static listarAutores = async (req, res, next) =>{

        try {
            const listaAutores = autor.find()

            req.resultado = listaAutores
            next() 
        } catch (error) {
          next(error)
        }
    }

    static criarAutor = async (req, res, next) =>{
        try{
            const novoAutor = await autor.create(req.body)
            res.status(200).json({message: "Autor criado", item: novoAutor})
        } catch(error){
            next(error)
        }
    }

    static listarAutorPorID = async (req, res, next) =>{
        try {
            const listaAutor = await autor.findById(req.params.id)

            if(listaAutor !== null){
                res.status(200).json({message: 'Autor encontrado', item: listaAutor})
            }else{
                next(new NaoEncontrado("ID do autor não localizado"))
            }
            
        } catch (error) {
            next(error)
        }
    }


    static atualizarAutor = async (req, res, next) =>{
        try {
            const id = req.params.id
            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body)
            if(autorAtualizado !== null){
                res.status(200).json({message: 'autor atualizado com sucesso'})
            } else {
                next(new NaoEncontrado("ID do autor não encontrado"))
            }
            
        } catch (error) {
           next(error)
        }
    }

    static deletarAutor = async (req, res, next) =>{
        try {
            const id = req.params.id
            const autorDeletado = await autor.findByIdAndDelete(id)
            if(autorDeletado !== null){
                res.status(200).json({message: 'Autor deletado com sucesso!'})
            } else {
                next(new NaoEncontrado("ID do autor não encontrado"))
            }
            
        } catch (error) {
           next(error)
        }
    }

}

export default AutorController