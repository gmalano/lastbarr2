const http = require('http')
const express = require('express')
const FoxRouter = require('fox-wamp')

const PORT = process.env.PORT || 5000

let app = express()
app.get('/', (req, res) => res.send('Hello World!'))

let httpServer = http.createServer(app)
httpServer.listen(PORT, () => console.log(`Listening on ${PORT}`))

router = new FoxRouter()
router.listenWAMP({ server: httpServer, path: '/wamp' })
