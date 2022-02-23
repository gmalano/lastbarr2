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


<script>
"local.js"
export default {
  data() {
    return {
      time: '',
      ws: null,
    }
  },

  created: function () {
    connect()
  },

  computed: {},
  methods: {
    send: function (message) {

     socket.send(JSON.stringify({
                "data" : "this is our data to send",
                "other" : "this can be in any format"
            }))

    },
  },
}
</script>
