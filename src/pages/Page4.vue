<template>
  <q-page padding>
    <div class="row items-center" style="height: 100px;">
      <span>
        <h4>Libres</h4>
      </span>

      <div class="q-pa-md">
        <q-avatar
          v-for="(u, idx) in MesasLibres"
          :key="idx"
          padding
          clickable
          v-ripple
          size="60px"
          font-size="20px"
          color="teal"
          text-color="white"
        >
          {{ u.idMesa }}
        </q-avatar>
      </div>
    </div>

    <span><h4>Ocupadas</h4></span>
    <div class="row">
      <div class="col-auto">
        <div v-for="(u, idx) in MesasTodas" :key="idx">
          <q-avatar
            padding
            clickable
            v-ripple
            size="60px"
            font-size="20px"
            :color="u.idMesa == idMesa ? 'red' : 'teal'"
            @click.prevent="gseleccionarmesa(u.idMesa, u.idOrden)"
          >
            {{ u.idMesa }}
          </q-avatar>

          <q-avatar size="60px">
            <img :src="require(`../images/${u.idusuario}.jpg`)" />
          </q-avatar>

          <q-btn
            padding="sm"
            align="between"
            icon="paid"
            :label="u.total.toFixed(2)"
            style="width: 180px;"
            :color="u.idMesa == idMesa ? 'red' : 'teal'"
            size="22px"
            @click.prevent="gseleccionarmesa(u.idMesa, u.idOrden)"
          />
        </div>
      </div>
      <div class="col-auto">
        <barConsumo :consumo="consumo" />
      </div>
    </div>
    {{ MesasTodas }}
  </q-page>
</template>

<script>
import io from 'socket.io-client'
import barConsumo from '../components/barConsumo.vue'

export default {
  components: {
    barConsumo,
  },

  data() {
    return {
      MesasTodas: [],
      MesasLibres: [],
      consumo: [],
      idMesa: 0,
      orden: 0,
      socket: io(this.$url+":3000"),

    }
  },

  created: function () {
    this.socket.on('MESASLIBRES', () => {
      this.gtodas()
      this.glibres()
      //this.gseleccionarmesa(this.idMesa, this.orden)
    })
    this.glibres()
    this.gtodas()
  },

  computed: {},
  methods: {
    glibres() {
      this.$axios
        .get('/mesaslibres')
        .then((response) => {
          this.MesasLibres = response.data
        })
        .catch((error) => {
          console.log('error glibres', error)
        })
    },
    gtodas() {
      this.$axios
        .get('/mismesas')
        .then((response) => {
          this.MesasTodas = response.data
        })
        .catch((error) => {
          console.log('error glibres', error)
        })
    },
    async gseleccionarmesa(mesa, orden) {
      let vm = this
      vm.idMesa = mesa
      vm.orden = orden

      await this.$axios
        .get(`orden/${orden}`)
        .then((response) => {
          let c = JSON.parse(response.data[0].Pedido)

          for (let i = 0; i < vm.consumo.length; i++) {
            vm.consumo.pop()
            --i
          }

          if (c === null) {
            return
          }

          c.forEach((cc) => {
            vm.consumo.push(cc)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    grefrescar() {
      let vm = this

      const filtered = vm.MesasTodas.filter(function (element) {
        return element.idMesa === vm.idMesa
      })

   if (filtered.length > 0) {
         vm.gseleccionarmesa(vm.idMesa, vm.orden)
   }
      // } else {

      //   for (let i = 0; i < vm.consumo.length; i++) {
      //       vm.consumo.pop()
      //       --i
      //     }
      // }

      // if (filtered.length > 0) {
      //   vm.gseleccionarmesa(vm.idMesa, vm.orden)
      // } else {

      //   for (let i = 0; i < vm.consumo.length; i++) {
      //       vm.consumo.pop()
      //       --i
      //     }
      // }
    },
  },
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: teal
</style>
