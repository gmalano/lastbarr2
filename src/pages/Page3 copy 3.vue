<template>
  <q-page>
    <div class="row">
      <div class="q-pa-md q-gutter-sm">
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
          @click.prevent="gseleccionarmesa(u.idMesa)"
        >
          {{ u.idMesa }}
        </q-avatar>

        <div class="row">
          <div class=" q-gutter-sm">
            <q-list size='100%'>
              <q-item clickable v-ripple v-for="(c, id) in consumo" :key="id" size="10px">
                <q-chip> 3 </q-chip>
                sssssssssssssssssssssssssssssssssssssss
                <q-item-section>
                  <q-btn v-ripple glossy color="primary" @click="alerta('+')"> + </q-btn>
                </q-item-section>
                <q-item-section>
                  <q-btn v-ripple glossy color="amber" @click="alerta('-')"> - </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <q-footer class="“fixed-bottom”">
          <div
            class="q-gutter-y-md column"
            style="width: 100%; max-width: 100%"
          >
            <q-toolbar class="bg-primary text-white">
              

              <q-input
                focus
                dark
                borderless
                v-model="text"
                input-class="text-right"
                class="q-ml-md"
                mask="S"
              >
                <template v-slot:append>
                  <q-icon v-if="text === ''" name="search"></q-icon>
                  <q-icon
                    v-else
                    name="clear"
                    class="cursor-pointer"
                    @click="text = ''"
                  ></q-icon>

                  <!-- <q-btn
                    color="primary"
                    size="xl"
                    icon-right="done_all"
                    :label="`Total $  ${total}`"
                  /> -->
                </template>
              </q-input>
            </q-toolbar>
          </div>
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
      total: 480.0,
      text: "",
      consumo: [1, 2, 3, 4, 5, 7,8,9,0,12,12,23,44,55,5,6,7,7,8],
    };
  },

  created: function () {
    this.activo = localStorage.getItem("idUsuario");
    this.idMesa = localStorage.getItem("idmesa");
    this.gmismesas();
    this.gseleccionarmesa(this.idMesa);
  },

  beforeMount: function () {},

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

alerta(m) {
      alert(m)},


    gseleccionarmesa(mesa) {
      let vm = this;
      vm.mesa = vm.misMesas.filter((me) => me.idMesa == mesa);
      console.log(vm.mesa);
      // vm.hora = vm.mesa[0]['fecha'].toString().substring(10, 16);
      // vm.image = vm.mesa[0].idusuario;
      vm.idMesa = mesa; // vm.mesa[0].idMesa
      localStorage.setItem("idmesa", mesa);
    },
  },
};
</script>
