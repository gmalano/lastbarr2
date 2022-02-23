var WampRouter = require('fox-wamp')
var program = require('commander')

program
  .option('-p, --port <port>', 'Server IP port', 5000)
  .parse(process.argv)

console.log('Listening port:', program.port);

var app = new WampRouter();
app.setLogTrace(true);


app.getRealm('realm1', function (realm) {
  var api = realm.wampApi()

  api.register('chat.getMessages', function (id, args, kwargs) {
    api.resrpc(id, null /* no error */, messages)
  })

  api.subscribe('chat.messages', (qid, args, kwargs) => {
    messages.push(kwargs.message)
    console.log('EVENT', kwargs)
  })
})

app.listenWAMP({ port: program.port })
