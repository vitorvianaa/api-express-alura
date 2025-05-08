import { autor, livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController{

    
    // static me permite usar os metodos da classe sem instanciar ela
    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livro.find()

            req.resultado = buscaLivros

            next()
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

    static listarLivroPorFiltro = async (req, res, next) => {
        
        try {
            const busca = await processaBusca(req.query)
            if(busca){
                const livroEncontrado = livro.find(busca)
                
                req.resultado = livroEncontrado
                
                next()
            } else {
                res.status(200).send([])
            }
      
        } catch (error) {
            next(error)
        }
    }


}


async function processaBusca(params){
    const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = params

    let busca = {}

    if(editora) busca.editora = {$regex: editora, $options: "i"}
    if(titulo) busca.titulo = {$regex: titulo, $options: "i"}

    if(minPaginas || maxPaginas) busca.paginas = {}

    // maior ou igual que
    if(minPaginas) busca.paginas.$gte = minPaginas
    // menor ou igual que
    if(maxPaginas) busca.paginas.$lte = maxPaginas

    if(nomeAutor) {
        const buscaAutor = await autor.findOne({nome: nomeAutor})
        if(buscaAutor !== null){
            busca.autor = buscaAutor._id
        } else {
            busca = null
        }
    }
    return busca
}

export default LivroController