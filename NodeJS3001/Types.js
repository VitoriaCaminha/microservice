import connection from "./database/connection.js"

var PORT = 3001
import express from "express"
const app = express()

app.get('/cliente/tipos', (req, res) => {
  const query = `SELECT * FROM tipo_cliente;`

  connection.query(query, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result)
    }
  })
})

app.listen(PORT, () => console.log('rodando porta 3001'))
