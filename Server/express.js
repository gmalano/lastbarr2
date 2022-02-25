'use strict'

const HTTP_PORT = process.env.PORT || 3000
var cors = require('cors')
var express = require('express')
var http = require('http')
var compression = require('compression')

var app = express()
app.use(cors())
app.use(compression())

const server = app.listen(HTTP_PORT, () => {
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

const io = require('socket.io')(server, {
  cors: {
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Credentials': false,
      })
      res.end()
    },
  },
})

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', function (data) {
    console.log(data)
    io.emit('MESSAGE', data)
  })
  socket.on('TOTAL', function (data) {
    console.log(data)
    io.emit('TOTAL', data)
  })
  socket.on('MESASLIBRES', function () {
    io.emit('MESASLIBRES')
  })
})

//app.io = io

/****************************************************************/

const Database = require('better-sqlite3')
const db = new Database('datos/datos.db')
db.exec('PRAGMA journal_mode = WAL;')
db.exec('PRAGMA auto_vacuum = FULL;')
db.exec('VACUUM;')

// Root endpoint
app.get('/', (req, res, next) => {
  res.json({ message: 'Ok!' })
})

app.get('/usuarios/:id?', function (req, res) {
  //this.socket.emit('SEND_MESSAGE', {

  let _id = req.params.id ? req.params.id : 'idUsuario'
  let sql = 'SELECT * FROM usuarios  where idUsuario = ' + _id
  const rows = db.prepare(sql).all()
  //io.socket.emit('SEND_MESSAGE', { hola: 01 })
  io.emit('MESSAGE', { hola: rows })
  res.send(rows)
})

app.get('/mesaslibres/', function (req, res) {
  
  let sql =
    `select idMesa
            from mesas m
            where m.idusuario isnull` + ''

  const rows = db.prepare(sql).all()
  io.emit('MESASLIBRES',rows)
  res.send(rows)
})

app.get('/mismesas/:id?', function (req, res) {
  let _id = req.params.id ? req.params.id : 'm.idUsuario' // or m.idUsuario is null'
  let sql =
    `select o.idMesa , u.usuario,ifnull(m.idusuario,'<<libre>>') idusuario, ifnull(total,0.00) as total
    from mesas m
    left  join usuarios u
    on m.idusuario = u.idusuario
    where m.idusuario = ` + _id

  let sql0 = `select o.idMesa , u.usuario,ifnull(m.idusuario,'<<libre>>') idusuario, ifnull(o.total,0.00) as total, o.idorden, o.fecha, o.Pedido
    from mesas m
    left  join usuarios u    on m.idusuario = u.idusuario
    left join ordenes o on o.idmesa = m.idmesa
    where  o.idorden = (select max(idorden) from  ordenes where idmesa = m.idmesa)
    and m.idusuario = ${_id}
    order by o.fecha desc    `

  const rows = db.prepare(sql0).all()
  res.send(rows)
})

app.get('/bar?', function (req, res) {
  let sql = `select nombre, precio,idBar from bar  order by idCategoria, orden `
  const rows = db.prepare(sql).all()
  res.send(rows)
})

app.get('/orden/:id/:pedido?/:total?', function (req, res) {
  let id = req.params.id
  let pe = req.params.pedido || ''
  let to = req.params.total || 0

  if (pe > '') {
    let sql = `update ordenes set pedido ='${pe}', total =${to} where idorden = ${id} `
    console.log(sql)
    db.exec(sql)
    let sql1 = `update mesas set total =${to} where idMesa = (select idmesa from Ordenes where idorden = ${id} ) `
    db.exec(sql1)
    io.emit('MESASLIBRES')
    res.header('Access-Control-Allow-Origin', '*').sendStatus(200)
  } else {
    let sql = `select pedido  from ordenes  where idorden =${id}`
    const rows = db.prepare(sql).all()
    io.emit('MESASLIBRES')
    res.send(rows)
  }
  //  io.emit('MESASOCUPADAS')
})

app.get('/cerrarmesa/:id', function (req, res) {
  let id = req.params.id
  let sql = `update mesas set idusuario =null, total = 0.00 where idmesa = ${id} `
  console.log(sql)
  db.exec(sql)
  io.emit('MESASLIBRES')

  res.header('Access-Control-Allow-Origin', '*').sendStatus(200)
})

app.get('/barx/:id1?/:id2?/:id3?/:id4?', function (req, res) {
  let _id1 = req.params.id1
    ? ` where upper(nombre) like upper("%${req.params.id1}%")`
    : ' '
  let _id2 = req.params.id2
    ? ` and upper(nombre) like upper("%${req.params.id2}%")`
    : ' '
  let _id3 = req.params.id3
    ? ` and  upper(nombre) like upper("%${req.params.id3}%")`
    : ' '
  let _id4 = req.params.id4
    ? ` and  upper(nombre) like upper("%${req.params.id4}%")`
    : ' '

  let sql = `select nombre, precio,idBar from bar  ${_id1}  ${_id2}  ${_id3}  ${_id4} order by idCategoria, orden `

  const rows = db.prepare(sql).all()

  res.send(rows)
})

app.get('/seleccionarorden/:id?', function (req, res) {
  let _id = req.params.id ? req.params.id : 'm.idUsuario or m.idUsuario is null'
  let sql =
    `select *
    from ordenes o
    left  join usuarios u
    on m.idusuario = u.idusuario
    where m.idusuario = ` + _id

  const rows = db.prepare(sql).all()

  res.send(rows)
})

app.get('/seleccionarmesa/:mesa/:usuario', function (req, res) {
  let _m = req.params.mesa
  let _u = req.params.usuario

  let sql = `update mesas
    set idUsuario=${_u}
    where idMesa = ${_m}`

  db.exec(sql)

  let sqli = `insert into ordenes
  (idusuario,idmesa )
  values
  (${_u},  ${_m})`

  db.exec(sqli)
  io.emit('MESASLIBRES')
  res.header('Access-Control-Allow-Origin', '*').sendStatus(200)
})

app.get('/borrarmesas', function (req, res) {
  let sql = `update mesas
    set idUsuario=null       `

  db.exec(sql)
  res.header('Access-Control-Allow-Origin', '*').sendStatus(200)
  io.emit('MESASLIBRES')
})

app.get('/sqle/:isql', function (req, res) {
  let sql = Buffer.from(req.params.isql, 'binary').toString('base64')
  res.send(sql)
})

app.get('/sql/:isql', function (req, res) {
  let sql = Buffer.from(req.params.isql, 'base64').toString('binary')
  const rows = db.prepare(sql).all()
  res.send(rows)
})

// Insert here other API endpoints

// Default response for any other request
app.use(function (req, res) {
  res.status(404)
})
