const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connection = require('./database/connection.js');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/cliente/gravar', multer().none(), (req, res) => {
  const {nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, descricao} = req.body;

  const insertionInCustomerTypes = 'INSERT INTO tipo_cliente (descricao) VALUES (?);';

  connection.query(insertionInCustomerTypes, [descricao], (err, result) => {
    if (err) {
      res.sendStatus(400);
      throw err;
    }

    const insertionInCustomers = 'INSERT INTO clientes (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipo_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

    const customerVariables = [nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, result.insertId];

    connection.query(insertionInCustomers, customerVariables, (err) => {
      if (err) {
        connection.query('DELETE FROM tipo_cliente WHERE idtipo_cliente = ?;', [result.insertId]);
        res.sendStatus(400);
        throw err;
      }
  
      res.sendStatus(201);
    });
  });
});


const port = 3002;
app.listen(port, () => console.log('Express server listening on port ' + port));