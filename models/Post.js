const db = require('./db')

const Post = db.sequelize.define('alimentos', {
    nome_alimento: {
        type: db.Sequelize.STRING
    },
    preco_alimento: {
        type: db.Sequelize.FLOAT
    },
    categoria: {
        type: db.Sequelize.STRING
    },
    mais_categoria: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    dest_imagem: {
        type: db.Sequelize.STRING
    }
})

//Post.sync({force: true})

module.exports = Post