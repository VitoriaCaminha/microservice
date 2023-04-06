import mysql from 'mysql'

const connection = mysql.createConnection({
  host: '192.168.0.114',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'db'
})

connection.connect()

export default connection