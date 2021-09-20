## Database made for inventory control at a supermarket.
## 🚀 Installing the necessary packages:

  Using Node Package Manager (NPM):
  
```
npm init
npm i ejs express mysql
```


## 🛠 Technologies Used:
✔️ NodeJS <br>
✔️ Express <br>
✔️ MySQL <br>
✔️ EJS <br>
✔️ Bootstrap

## 📃 Table models:
<ul>
  <h3>📍 Funcionários </h3>
  <li>id_funcionario INT NOT NULL AUTO_INCREMENT,</li>
  <li> nome_funcionario VARCHAR(255) NOT NULL,</li>
  <li> cargo_funcionario VARCHAR(255) NOT NULL,</li>
  <li> cpf_funcionario VARCHAR(255) NOT NULL,</li>
   <li>PRIMARY KEY (id_funcionario)</li>
</ul>

<ul>
  <h3>📍 Fornecedores </h3>
    <li>id_fornecedor INT NOT NULL AUTO_INCREMENT</li>
    <li>nome_fornecedor VARCHAR(255) NOT NULL</li>
    <li>cnpj_fornecedor VARCHAR(255) NOT NULL</li>
    <li>PRIMARY KEY (id_fornecedor)</li>
</ul>

<ul>
    <h3>📍 Produtos </h3>
    <li>id_produto INT NOT NULL AUTO_INCREMENT</li>
    <li>nome_produto VARCHAR(255) NOT NULL</li>
    <li>quantidade_produto INT NOT NULL</li>
    <li>secao VARCHAR(255) NOT NULL</li>
    <li>preco FLOAT NOT NULL</li>
    <li>data_insercao DATE NOT NULL</li>
    <li>funcionario_produtos INT NOT NULL</li>
    <li>fornecedor_produtos INT NOT NULL</li>
    <li>PRIMARY KEY (id_produto)</li>
    <li>FOREIGN KEY (funcionario_produtos) REFERENCES funcionarios (id_funcionario)</li>
    <li>FOREIGN KEY (fornecedor_produtos) REFERENCES fornecedores (id_fornecedor)</li>
</ul>

<ul>
    <h3>📍 Vendas </h3>
    <li>id_venda INT NOT NULL AUTO_INCREMENT</li>
    <li>data_venda DATETIME NOT NULL</li>
    <li>quantidade_vendida INT NOT NULL</li>
    <li>total FLOAT NOT NULL</li>
    <li>vendedor INT NOT NULL</li>
    <li>produto_vendido INT NOT NULL</li>
    <li>PRIMARY KEY (id_venda</li>
    <li>FOREIGN KEY (vendedor) REFERENCES funcionarios (id_funcionario</li>
    <li>FOREIGN KEY (produto_vendido) REFERENCES produtos (id_produto)</li>
</ul>
