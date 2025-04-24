import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

// eu herdo de RequisicaoIncorreta pq eles tem o mesmo status code
class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        console.log('erro aqui -> ', erro)
        const mensagensErro = Object.values(erro.errors).map(erro => erro.message).join('; ')
    
        super(`Os seguintes erros foram encontrados: ${mensagensErro}`)
    }
}

export default ErroValidacao