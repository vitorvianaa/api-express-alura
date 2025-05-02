import mongoose from "mongoose";


// schema é um esqueleto da minha model no banco
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    titulo: { type: String, required: [true, 'O título do livro é obrigatório!'] },
    editora: { type: String },
    preco: { type: Number },
    paginas: { 
        type: Number,
        validate: {
            validator: (valor) => valor >= 10 && valor <= 5000,
            message: "O número de páginas deve estar entre 10 e 10000!"
        }
    },
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: [true, 'O autor(a) é obrigatório!']}
}, { versionKey: false })

const livro = mongoose.model('livros', livroSchema)

export default livro