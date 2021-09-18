const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', __dirname, 'views')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "estoque",
})

db.connect((err) => {
    if (err) throw err
    console.log('MySQL was connected successfully!')
})

app.listen(port, () => {
    console.log(`Running on ${port}`)
})

app.get('/', (req, res) => {
    res.render('views/pages/index')
})

app.get('/cadastrarprodutos', (req, res) => {
    res.render('views/pages/cadastrarProdutos')
})

app.get('/produtos', function (req, res) {
    db.query('SELECT * FROM produtos', (err, achado) => {
        if (err)  throw err
        else res.render('views/pages/produtos', { produtos_achados: achado });
    });
});

app.post('/cadastrarprodutos', (req, res) => {
    var nome_produto = req.body.nome_produto
    var quantidade_produto = req.body.quantidade_produto
    var secao = req.body.secao
    var preco = req.body.preco
    var data_insercao = req.body.data_insercao
    var funcionario_produtos = req.body.funcionario_produtos
    var fornecedor_produtos = req.body.fornecedor_produtos

    var inserir_produto = `INSERT INTO produtos (nome_produto, quantidade_produto, secao, preco, data_insercao, funcionario_produtos, fornecedor_produtos) VALUES('${nome_produto}', ${quantidade_produto}, '${secao}', ${preco}, ${data_insercao}, ${funcionario_produtos}, ${fornecedor_produtos});`;

    db.query(inserir_produto, (err, result) => {
        if (err) throw err
        return res.redirect('/produtos')
    })
});

app.get("/deletarproduto/(:id)", (req, res) => {
    var id = req.params.id
    db.query('DELETE FROM produtos WHERE id_produto = ' + id, (err, result) => {
        if (err) throw err;
        else res.redirect('/produtos')
    })
});