import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController{

    
    // static me permite usar os metodos da classe sem instanciar ela
    static listarLivros = async (req, res, next) => {
        try {
            const listaLivros = await livro.find({})
            res.status(200).send(listaLivros)       
        } catch (error) {
            next(error)
        }
    }


    static criarLivro = async (req, res, next) => {
        const dataReq = req.body
        try {
            const dataAutor = await autor.findById(dataReq.autor)
            const objCriarLivro = { ...dataReq, autor: { ...dataAutor._doc } }
            const livroCriado = await livro.create(objCriarLivro)
            res.status(201).json({message: 'Criado com sucesso', livro: livroCriado})
        } catch (error) {
            next(error)
        }
    }

    static listarLivroPorId = async (req, res, next) => {
        try{
            const id = req.params.id
            const listaLivro = await livro.findById(id)
            if(listaLivro !== null){
                res.status(200).json(listaLivro)
            }else{
                next(new NaoEncontrado("ID do livro não encontrado"))
            }
            
        } catch(error){
            next(error)
        }
    }

    static atualizarLivro = async (req, res, next) => {
        try{
            const id = req.params.id
            const livroAtualizado = await livro.findByIdAndUpdate(id, req.body)
            if(livroAtualizado !== null){
                res.status(200).json({message: 'Livro atualizado com sucesso!'})
            } else {
                next(new NaoEncontrado("ID do livro não encontrado"))
            }
           
        }catch(erro){
            next(erro)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const id = req.params.id
            const livroDeletado = await livro.findByIdAndDelete(id)
            if(livroDeletado !== null){
                res.status(200).json({message: 'Livro deletado com sucesso!'})
            } else {
                next(new NaoEncontrado("ID do livro não encontrado"))
            }
            
        } catch (error) {
            next(error)
        }
    }

    static buscaPorEditora = async (req, res, next) => {
        const editora = req.query.editora
        try {
            const livroEncontrado = await livro.find({editora: editora})
            if(livroEncontrado.length > 0){
                res.status(200).json({message: `livro encontrado`, item: livroEncontrado})
            } else {
                next(new NaoEncontrado("Editora não encontrada"))
            }
            
        } catch (error) {
            next(error)
        }
    }


}

export default LivroController