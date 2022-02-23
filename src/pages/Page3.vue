<template>
  <q-page padding>
    <div class="row">
      <div class="q-pa-md">
        <q-avatar
          v-for="(u, idx) in misMesas"
          :key="idx"
          padding
          clickable
          v-ripple
          size="60px"
          font-size="20px"
          :color="u.idMesa == idMesa ? 'red' : 'teal'"
          text-color="white"
          @click.prevent="gseleccionarmesa(u.idMesa, u.idOrden)"
        >
          {{ u.idMesa }}
        </q-avatar>
      </div>
    </div>

    <listaConsumo :consumo="consumo" @update-cart="update" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="accent"
        @click="open = !open"
        v-if="haymesa"
      />
    </q-page-sticky>

    <q-footer>
      <q-btn
        padding="sm"
        align="around"
        color="secondary"
        icon="paid"
        :label="total"
        style="width: 200px;"
        size="22px"
        @click="gcerrarmesa"
      />
    </q-footer>

    <div>
      <q-dialog v-model="open" @hide="update()">
        <listaBar :bar="bar" :consumo="consumo" />
      </q-dialog>
    </div>

    <!-- <div>
      <q-dialog v-model="abre">
        <dialogo :text="mensaje" :ok="ok" :cancelar="cancelar" />
      </q-dialog>
    </div> -->

    <div></div>
  </q-page>
</template>

<script>
import listaBar from '../components/listaBar.vue'
import listaConsumo from '../components/listaConsumo.vue'
//import dialogo from '../components/dialogo.vue'

import DialogService from '../services/DialogService.vue'

export default {
  components: {
    // dialogo,
    listaBar,
    listaConsumo,
  },

  emits: ['update-cart'],

  data() {
    return {
      misMesas: [],
      activo: 0,
      idMesa: 0,
      mesa: [],
      bar: [],
      open: false,
      hora: '',
      abre: false,
      image: 0,
      mensaje: '',
      cancelar: true,
      orden: 0,
      ok: false,
      consumo: [],
      haymesa: false,
    }
  },

  created: function () {
    this.activo = localStorage.getItem('idUsuario')
    this.idMesa = localStorage.getItem('idmesa')
    this.orden = localStorage.getItem('idorden')
    this.gmismesas()
    // this.gseleccionarmesa(this.idMesa, this.orden);
    this.gbar()
  },

  beforeMount: function () {},

  computed: {
    total() {
      return this.consumo
        .reduce((total, item) => item.Cantidad * item.Precio + total, 0)
        .toFixed(2)
    },
  },
  methods: {
    async gmismesas() {
      await this.$axios
        .get(`/mismesas/${this.activo}`)
        .then((response) => {
          this.misMesas = response.data
          this.haymesa = this.misMesas.length  &&  this.activo           //gmalano
        })
        .catch((error) => {
          console.log('error get')
        })
      //this.gseleccionarmesa(this.mesa)
      //console.log(this.misMesas)
    },

    async gseleccionarmesa(mesa, orden) {
      let vm = this
      vm.idMesa = mesa // vm.mesa[0].idMesa

      //vm.mesa = vm.misMesas.filter((me) => me.idMesa === mesa);
      //console.log("mesa", vm.mesa);
      //console.log(orden)
      // vm.hora = vm.mesa[0]['fecha'].toString().substring(10, 16);
      // vm.image = vm.mesa[0].idusuario;
      vm.orden = orden
      localStorage.setItem('idmesa', mesa)
      localStorage.setItem('idorden', orden)

      //vm.consumo=[]
      await this.$axios
        .get(`orden/${orden}`)
        .then((response) => {
          let c = JSON.parse(response.data[0].Pedido)
          //console.log(  c===null)
          //vm.consumo = vm.consumo =c
          //this.gblank();

          //vm.consumo = vm.consumo.slice(0,1)
          // vm.consumo.push(c)

          //vm.consumo.length=0

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

    async update() {
      let vm = this
      let con = JSON.stringify(vm.consumo)
      await this.$axios
        .get(`orden/${vm.orden}/${con}/${vm.total}`)
        .then((response) => {})
        .catch((error) => {
          console.log('error', error)
        })
    },

    async gcerrarmesa() {
      let mensaje = 'Cierra esta mesa??'
      this.ok = false
      this.abre = true
      if (confirm(mensaje)) {
        let vm = this

          this.$axios
            .get(`cerrarmesa/${vm.idMesa}`)
            .then((response) => {
              for (let i = 0; i < vm.consumo.length; i++) {
                vm.consumo.pop()
                --i
              }
              vm.idMesa = -1
              vm.$store.commit(
                'setMesasLibres',
                vm.$store.state.MesasLibres + 1,
              )
              vm.$alert('Mesa Cerrada!', 'green', 'ok')
              vm.gmismesas()
            })
            .catch((error) => {
              console.log('error', error)
            })
      }

      // try {
      //   if ( DialogService.confirm('Title', 'Ok/Nok', 'Press ok')) {
      //     alert(1)
      //   } else {
      //     alert(2)
      //   }
      // } catch (error) {
      //   // Code when something Wrong
      // }
    },

    async xgcerrarmesa() {
      let vm = this

      await vm.$dialog('Cierra esta mesa?', 'Cancelar').then(
        this.$axios
          .get(`cerrarmesa/${vm.idMesa}`)
          .then((response) => {
            for (let i = 0; i < vm.consumo.length; i++) {
              vm.consumo.pop()
              --i
            }
            vm.idMesa = -1
            vm.$store.commit('setMesasLibres', vm.$store.state.MesasLibres + 1)
            vm.$alert('Mesa Cerrada!', 'green', 'ok')
            vm.gmismesas()
          })
          .catch((error) => {
            console.log('error', error)
          }),
      )
    },
    async gbar() {
      await this.$axios
        .get('/bar')
        .then((response) => {
          this.bar = response.data
        })
        .catch((error) => {
          console.log('error get')
        })
    },

    //  onHide() {      this.update();    },
  },
}
</script>

<style lang="sass">
p
  text-align: right
  color: red
  font-weight: bolder


p1
  text-align: left
  padding: 1px
</style>

<!--
    GET_BLANK: function() {
      this.RECORD = JSON.parse(JSON.stringify(this.ENBLANCO));
      this.COMBUSTIBLES = JSON.parse(
        JSON.stringify(this.COMBUSTIBLES_ENBLANCO)
      );
    }, -->
