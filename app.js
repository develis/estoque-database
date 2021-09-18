const express = require('express')
const { now } = require('moment')
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

// CRUD PRODUTOS

// READ
app.get('/produtos', function (req, res) {
    db.query('SELECT * FROM produtos', (err, achado) => {
        if (err) throw err
        else res.render('views/pages/produtos', { produtos_achados: achado });
    });
});

// CREATE
app.get('/cadastrarprodutos', (req, res) => {
    res.render('views/pages/cadastrarProdutos')
})

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

// DELETE
app.get("/deletarproduto/(:id)", (req, res) => {
    var id = req.params.id
    db.query('DELETE FROM produtos WHERE id_produto = ' + id, (err, result) => {
        if (err) throw err;
        else res.redirect('/produtos')
    })
});

// UPDATE
app.get('/editarproduto/(:id)', function (req, res) {
    let id = req.params.id;
    db.query('SELECT * FROM produtos WHERE id_produto = ' + id, function (err, achado, fields) {
        if (err) throw err
        else {
            res.render('views/pages/editarProduto', {
                title: 'Editar Produto',
                id_produto: achado[0].id_produto,
                nome_produto: achado[0].nome_produto,
                quantidade_produto: achado[0].quantidade_produto,
                secao: achado[0].secao,
                preco: achado[0].preco,
                funcionario_produtos: achado[0].funcionario_produtos,
                fornecedor_produtos: achado[0].fornecedor_produtos,
            })
        }
    })
})

app.post('/editarproduto/:id', function (req, res) {
    let id = req.params.id;
    var nome_produto = req.body.nome_produto
    var quantidade_produto = req.body.quantidade_produto
    var secao = req.body.secao
    var preco = req.body.preco
    var funcionario_produtos = req.body.funcionario_produtos
    var fornecedor_produtos = req.body.fornecedor_produtos
    var form_data = {
        nome_produto: nome_produto,
        quantidade_produto: quantidade_produto,
        secao: secao,
        preco: preco,
        data_insercao: new Date(),
        funcionario_produtos: funcionario_produtos,
        fornecedor_produtos: fornecedor_produtos,
    }
    db.query('UPDATE produtos SET ? WHERE id_produto = ' + id, form_data, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/produtos');
        }
    })
})

// CRUD FUNCIONARIOS

// READ
app.get('/funcionarios', function (req, res) {
    db.query('SELECT * FROM funcionarios', (err, achado) => {
        if (err) throw err
        else res.render('views/pages/funcionarios', { funcionarios_achados: achado });
    });
});

// CREATE
app.get('/cadastrarfuncionarios', (req, res) => {
    res.render('views/pages/cadastrarFuncionarios')
})

app.post('/cadastrarfuncionarios', (req, res) => {
    var nome_funcionario = req.body.nome_funcionario
    var cargo_funcionario = req.body.cargo_funcionario
    var cpf_funcionario = req.body.cpf_funcionario
    var inserir_funcionario = `INSERT INTO funcionarios (nome_funcionario, cargo_funcionario, cpf_funcionario) VALUES('${nome_funcionario}', '${cargo_funcionario}','${cpf_funcionario}');`;
    db.query(inserir_funcionario, (err, result) => {
        if (err) throw err
        return res.redirect('/funcionarios')
    })
});

// DELETE
app.get("/deletarfuncionario/(:id)", (req, res) => {
    var id = req.params.id
    db.query('DELETE FROM funcionarios WHERE id_funcionario = ' + id, (err, result) => {
        if (err) throw err;
        else res.redirect('/funcionarios')
    })
});

// UPDATE
app.get('/editarfuncionario/(:id)', function (req, res) {
    let id = req.params.id;
    db.query('SELECT * FROM funcionarios WHERE id_funcionario = ' + id, function (err, achado, fields) {
        if (err) throw err
        else {
            res.render('views/pages/editarFuncionario', {
                title: 'Editar Funcionário',
                id_funcionario: achado[0].id_funcionario,
                nome_funcionario: achado[0].nome_funcionario,
                cargo_funcionario: achado[0].cargo_funcionario,
                cpf_funcionario: achado[0].cpf_funcionario,
            })
        }
    })
})

app.post('/editarfuncionario/:id', function (req, res) {
    let id = req.params.id;
    var nome_funcionario = req.body.nome_funcionario
    var cargo_funcionario = req.body.cargo_funcionario
    var cpf_funcionario = req.body.cpf_funcionario
    var form_data = {
        nome_funcionario: nome_funcionario,
        cargo_funcionario: cargo_funcionario,
        cpf_funcionario: cpf_funcionario,
    }
    db.query('UPDATE funcionarios SET ? WHERE id_funcionario = ' + id, form_data, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/funcionarios');
        }
    })
})

// CRUD FORNECEDORES

// READ
app.get('/fornecedores', function (req, res) {
    db.query('SELECT * FROM fornecedores', (err, achado) => {
        if (err) throw err
        else res.render('views/pages/fornecedores', { fornecedores_achados: achado });
    });
});

// CREATE
app.get('/cadastrarfornecedores', (req, res) => {
    res.render('views/pages/cadastrarFornecedores')
})

app.post('/cadastrarfornecedores', (req, res) => {
    var nome_fornecedor = req.body.nome_fornecedor
    var cnpj_fornecedor = req.body.cnpj_fornecedor
    var inserir_fornecedor = `INSERT INTO fornecedores (nome_fornecedor, cnpj_fornecedor) VALUES('${nome_fornecedor}', '${cnpj_fornecedor}');`;
    db.query(inserir_fornecedor, (err, result) => {
        if (err) throw err
        return res.redirect('/fornecedores')
    })
});

// DELETE
app.get("/deletarfornecedor/(:id)", (req, res) => {
    var id = req.params.id
    db.query('DELETE FROM fornecedores WHERE id_fornecedor = ' + id, (err, result) => {
        if (err) throw err;
        else res.redirect('/fornecedores')
    })
});

// UPDATE
app.get('/editarfornecedor/(:id)', function (req, res) {
    let id = req.params.id;
    db.query('SELECT * FROM fornecedores WHERE id_fornecedor = ' + id, function (err, achado, fields) {
        if (err) throw err
        else {
            res.render('views/pages/editarFornecedor', {
                title: 'Editar Fornecedor',
                id_fornecedor: achado[0].id_fornecedor,
                nome_fornecedor: achado[0].nome_fornecedor,
                cnpj_fornecedor: achado[0].cnpj_fornecedor,
            })
        }
    })
})

app.post('/editarfornecedor/:id', function (req, res) {
    let id = req.params.id;
    var nome_fornecedor = req.body.nome_fornecedor
    var cnpj_fornecedor = req.body.cnpj_fornecedor
    var form_data = {
        nome_fornecedor: nome_fornecedor,
        cnpj_fornecedor: cnpj_fornecedor,
    }
    db.query('UPDATE fornecedores SET ? WHERE id_fornecedor = ' + id, form_data, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/fornecedores');
        }
    })
})