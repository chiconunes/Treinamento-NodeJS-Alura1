const roteador = require('express').Router()
const config = require("config")
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/',async(requisicao,resposta) => {
    console.log("Opa ! entramos no get")
    const resultados = await TabelaFornecedor.listar()
    console.log("Nos perdemos no get")
    
    resposta.send(JSON.stringify(resultados))
})

roteador.post('/',async (requisicao,resposta)=>{
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar() 
    console.log("Opa ! entramos no post")
    resposta.send(JSON.stringify(fornecedor))

})

roteador.get('/:idFornecedor',async(requisicao,resposta) => {
    console.log("Opa ! entramos no get idFornecedor ")
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        resposta.send(JSON.stringify(fornecedor))
        
    } catch (error) {
        //resposta.send(JSON.stringify({mensagem:error.message}))
        resposta.json({mensagem:error.message})
        
    }
})
 
module.exports = roteador