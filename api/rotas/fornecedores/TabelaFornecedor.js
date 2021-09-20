//const { ConnectionTimedOutError } = require('sequelize/types')
const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar(){
        console.log(">>> listar()")
        return  Modelo.findAll()
    },

    inserir(fornecedor){
        return  Modelo.create(fornecedor)
    },

    async pegarPorID(id){
        console.log("Entrou no pegarPorID")
        const encontrado = await Modelo.findOne({            
            where: {
                id : id
            }
        })
        if (!encontrado){
            throw new Error('Fornecedor não encontrado')            
        }
        return encontrado
    }
}