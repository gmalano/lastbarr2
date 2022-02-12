<template>
  <q-page>
    <div class="row" border="2">
      <div class="column" style="width: 20%; max-height: 100%">
        <div class="q-pa-md q-gutter-sm">
          <q-avatar
            v-for="(u, idx) in misMesas"
            :key="idx"
            padding
            clickable

            v-ripple
            size="180 ps"
            font-size="28px"
            :color= "u.idMesa == idMesa? 'red': 'teal'"

            text-color="white"
            @click.prevent="gseleccionarmesa(u.idMesa)"
          >
            {{ u.idMesa }}
          </q-avatar>
        </div>
      </div>

      <div class="column" style="width: 80%; max-height: 100%">
        <q-page>
          <q-banner inline-actions class="bg-info text-white">
            <q-btn
              color="primary"
              size="lg"
              icon-right="done_all"
              :label="`Total $  ${total}`"
            />

            <template v-slot:action>
              <q-avatar color="primary">
                <img :src="require(`../Images/${image}.jpg`)" />
              </q-avatar>

            </template>
          </q-banner>
        </q-page>
        <q-footer class="“fixed-bottom”">
          <q-input filled v-model="text" color="white" class="text-white" />
        </q-footer>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      misMesas: [],
      activo: 0,
      idMesa: 0,
      mesa: [],
      hora: "",
      image: 0,
      total: 0.0,
      text: "",
    };
  },

  created: function () {
    this.activo = localStorage.getItem("idUsuario");
    this.idMesa = localStorage.getItem("idmesa")
    this.gmismesas()
    this.gseleccionarmesa(this.idMesa)


  },

  beforeMount: function () {
  },

  computed: {},
  methods: {
     async gmismesas() {
      await this.$axios
        .get(`/mismesas/${this.activo}`)
        .then((response) => {
          this.misMesas = response.data;
        })
        .catch((error) => {
          console.log("error get");
        });
         //this.gseleccionarmesa(this.mesa)
         //console.log(this.misMesas)

    },



  gseleccionarmesa(mesa) {
      let vm = this
      vm.mesa= vm.misMesas.filter(me => me.idMesa == mesa)
      console.log(vm.mesa)
     // vm.hora = vm.mesa[0]['fecha'].toString().substring(10, 16);
     // vm.image = vm.mesa[0].idusuario;
      vm.idMesa =mesa // vm.mesa[0].idMesa
      localStorage.setItem("idmesa", mesa);
    },
  }
}
</script>
