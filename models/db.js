const Sequelize = require('sequelize')

//conexão com o banco de dados Mysql
const sequelize = new Sequelize('cave', 'root', '1234',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}