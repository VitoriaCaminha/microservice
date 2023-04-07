const connection = require('./db');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();

const port = 3004;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

app.get('/cliente/buscar/email/:email', function (req, res) {

    let email = req.params.email

    execSQLQuery('select nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo  from clientes join tipo_cliente on clientes.idtipo_cliente = tipo_cliente.idtipo_cliente where clientes.email = ' + '"' + email + '"' , res )
})
;

app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'atvmysql',
      port     : 3306,
      user     : 'user1',
      password : '123456',
      database : 'atv1403'
    });
   
    connection.query(sqlQry, (error, results, fields) => {
        if(error)
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
}

