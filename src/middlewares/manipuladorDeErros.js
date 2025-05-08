import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"
import ErroValidacao from "../erros/ErroValidacao.js"
import NaoEncontrado from "../erros/NaoEncontrado.js"

function manipuladorDeErros(erro, req, res, next) {
    console.log('olha o erro aqui -> ', erro)
    if (erro instanceof mongoose.Error.CastError) {
        console.log('entrei aqui')
        new RequisicaoIncorreta().enviarResposta(res)
    }

    else if (erro instanceof mongoose.Error.ValidationError) {
        console.log('entrei nesse')
        new ErroValidacao(erro).enviarResposta(res)
    }
    else if (erro instanceof ErroBase) {
        erro.enviarResposta(res)
    }
    else {
        console.log('entrei aq tb')
        new ErroBase().enviarResposta(res)
    }
}
export default manipuladorDeErros