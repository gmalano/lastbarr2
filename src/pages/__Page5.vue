<template>
  <q-page padding>
    {{ time }}
    <q-btn
      padding="sm"
      align="around"
      color="secondary"
      icon="paid"
      style="width: 200px;"
      size="22px"
      @click="send('hola')"
    ></q-btn>
  </q-page>
</template>

<script src="local.js"></script>

<script>
export default {
  data() {
    return {
      time: '',
      ws: null,
    }
  },

  created: function () {
    const ws = require('ws')

    const client = new ws('ws://localhost:3000')

    client.on('open', () => {
      // Causes the server to print "Hello"
      client.send('Hello')
    })
  },

  computed: {},
  methods: {
    send: function (message) {
      this.ws.send(1)
    },
  },
}
</script>
