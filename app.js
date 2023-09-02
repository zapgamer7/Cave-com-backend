const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Post = require('./models/Post');
const multparty = require('multiparty');
const fs = require('fs');

const IMAGE_UPLOAD_DIR = "/cave/public/imagens_cadastro"
const IMAGE_BASE_URL = "http://localhost:359/images/"
//função do crud
const crud = {
    alimento: [],
    
    read(){
        crud.alimento = JSON.parse(fs.readFileSync('./public/dados/alimentos.json', {encoding: 'utf-8'}))
        return crud.alimento
    },
    
    create({id_alimento, nome_alimento, preco_alimento, categoria, mais_categoria, dest_imagem}){
        const dados = {id_alimento, nome_alimento, preco_alimento, categoria, mais_categoria, dest_imagem}
        crud.alimento.push(dados)
        fs.writeFileSync('./public/dados/alimentos.json', JSON.stringify(crud.alimento), {encoding: 'utf-8'})
    }
}

    //utilização de pasta

    app.use(express.static('public'))

    // Template Engine
    

    app.engine('handlebars', engine({
        defaultLayout: 'main',
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }))
    
    app.set('view engine', 'handlebars')
    //rotas
    app.get('/', function(req,res){
        res.render('inicio', {
            style: 'inicio.css',
            script: 'inicio.js'
        })
    })

    app.get('/cad/', function(req, res){
        res.render('cadastro',{
            style: 'cadastro.css',
            script: 'cadastro.js'
        })
    })

    app.post('/add', function(req, res){
        let form = new multparty.Form({uploadDir: IMAGE_UPLOAD_DIR})

        form.parse(req, async function(err, fields, files){
            if(err) return res.send({error: err.message});

            console.log(`fields = ${JSON.stringify(fields, null, 2)}`)
            console.log(`files = ${JSON.stringify(files, null, 2)}`)
            

            const imagePath = files.imagem[0].path;
            const imageFilename = imagePath.slice(imagePath.lastIndexOf("\\")+ 1);
            const imageURL = IMAGE_BASE_URL + imageFilename;
            console.log(imageURL);
            console.log(imageFilename)

            let nome_alimento = fields.nome_alimento[0]
            let preco_alimento = parseFloat(fields.preco_produto[0].replace(",", "."))
            let categoria = fields.categorias[0]
            let mais_categoria = fields.maiscategoria[0]



            await Post.create({
                nome_alimento: nome_alimento.toUpperCase(),
                preco_alimento: preco_alimento.toFixed(2),
                descricao: fields.desc_produto[0],
                categoria: fields.categorias[0],
                mais_categoria: fields.maiscategoria[0],
                dest_imagem: imageFilename
            }).then(function(){
                res.redirect('/cad')
            }).catch(function(erro){
                res.send("produto não cadastrado devido ao erro: " + erro)
            })
            const procurarId = await Post.findAll({
                attributes: ['id']
            });

            var acharId = procurarId.length - 1

            var proximoId = JSON.stringify(procurarId[acharId])

            var ultimoIndex = proximoId.length - 1

            var separacao = proximoId.slice(6, ultimoIndex)
            




            console.log(proximoId)
            crud.read()
            crud.create({id_alimento: separacao, nome_alimento, preco_alimento, categoria, mais_categoria, dest_imagem:imageFilename})
        })

    })

    app.get('/alimentos/:a/:b', function(req, res){
        Post.findAll({where:{ 'categoria': req.params.a, 'mais_categoria': req.params.b  }}).then(function(alimentos){
            res.render('principal', {alimentos: alimentos, style: 'principal.css', script: 'principal.js'})
        })
    })

    app.get('/cart', function(req, res){
        res.render('carrinho', {style: 'carrinho.css', script: 'carrinho.js'})
    })
    
    app.listen(80, function(){
        console.log('Server is running on port 80 acess using localhost');
    });