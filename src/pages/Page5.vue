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
      @click="send1"
    ></q-btn>
  </q-page>
</template>

<script>
import io from 'socket.io-client'


export default {

data() {
    return {
      time: '',
      socket: io(this.$url+":3000"),
    }
  },

  created: function () {
    alert(this.$url)
    this.socket.on('MESSAGE', (data) => {

      this.time = data
      // you can also do this.messages.push(data)
    })
    this.socket.on('TOTAL', (data) => {

      this.time = data
      // you can also do this.messages.push(data)
    })
  },

  computed: {},
  methods: {
    send1: function () {
      let f = new Date() //.toTimeString()
      this.socket.emit('SEND_MESSAGE', {
        hola: f,
      })
    },
  },
}
</script>
