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
          @click.prevent="gseleccionarmesa(u.idMesa)"
        >
          {{ u.idMesa }}
        </q-avatar>
      </div>
</div>
        
      <div class="row">
         <div >
        <q-list padding size="350px">
          <q-item
            clickable
            v-ripple
            v-for="(c, id) in consumo"
            :key="id"
            
          >
            <q-item-section>
              <q-item-label>{{ c.Nombre }} </q-item-label>
            </q-item-section>
             <q-space /> 
            <q-item-section class="items-end">
              <q-btn v-ripple glossy color="primary" @click="alerta('+')">
                +
              </q-btn>
              <q-space />
            </q-item-section>
            <q-item-section>
              <q-btn v-ripple glossy color="amber" @click="alerta('-')">
                -
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>


    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="open = !open" />
    </q-page-sticky>

    <div>
      <q-dialog v-model="open">
        <q-layout container class="bg-white" style="width: 100%">
          <q-page-container>
            <q-page padding>
              <div class="row" style="width: 100%">
                <q-toolbar class="bg-primary text-white" style="width: 100%">
                  <q-input
                    focus
                    dark
                    borderless
                    v-model="text"
                    input-class="text-center"
                    class="q-ml-lg"
                    style="width: 90%"
                  >
                    <template v-slot:append>
                      <q-icon v-if="text === ''" name="search"></q-icon>
                      <q-icon
                        v-else
                        name="clear"
                        class="cursor-pointer"
                        @click="text = ''"
                      ></q-icon>
                    </template>
                  </q-input>
                </q-toolbar>
              </div>
              <div>
                <q-list padding>
                  <q-item clickable v-ripple v-for="(c, id) in map" :key="id">
                    <q-item-section no-wrap>
                      <q-item-label> {{ c.Nombre }} </q-item-label>
                    </q-item-section>
                    <q-item-section no-wrap>
                      <p>$</p>
                    </q-item-section>
                    <q-item-section no-wrap>
                      <p>{{ c.Precio.toFixed(2) }}</p>
                    </q-item-section>

                    <q-item-section>
                      <q-btn
                        v-ripple
                        glossy
                        color="primary"
                        @click="gseleccionarbar(c.idBar)"
                        style="width: 100%"
                      >
                        +
                      </q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <!-- <q-btns  icon="add" color="accent" @click="open = !open"/> -->
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
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
      bar: [],

      hora: "",
      image: 0,
      total: 480.0,
      text: "    ",
      open: false,
      consumo: [1,2,3,4,5,5],
    };
  },

  created: function () {
    this.activo = localStorage.getItem("idUsuario");
    this.idMesa = localStorage.getItem("idmesa");
    this.gmismesas();
    this.gseleccionarmesa(this.idMesa);
    this.gbar();
  },

  beforeMount: function () {},

  computed: {
    barfilt() {
      let vm = this;
      let array = vm.text.trim().split(" ");

      if (vm.bar.length) {
        let find = (vm.text || "").toUpperCase().trim();
        let bar = vm.bar.filter((bars) =>
          bars.Nombre.toUpperCase().includes(find)
        );
        return bar;
      }
      return vm.bar;
    },

    map() {
      let vm = this;
      let sarray = vm.text.toUpperCase().trim().split(" ");
      let filtro = vm.bar;

      sarray.forEach((a) => {
        console.log(a);
        let bar = filtro.filter((bars) =>
          bars.Nombre.toUpperCase().includes(a)
        );
        filtro = bar;
      });
      return filtro;
    },
  },
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
      alert(m);
    },

    gseleccionarmesa(mesa) {
      let vm = this;
      vm.mesa = vm.misMesas.filter((me) => me.idMesa == mesa);
      //console.log(vm.mesa);
      // vm.hora = vm.mesa[0]['fecha'].toString().substring(10, 16);
      // vm.image = vm.mesa[0].idusuario;
      vm.idMesa = mesa; // vm.mesa[0].idMesa
      localStorage.setItem("idmesa", mesa);
    },

    gseleccionarbar(id) {
      let vm = this;
      let bar0 = vm.bar.filter((b) => b.idBar == id);
      console.log(bar0);
      let data = {};
      let bar = bar0[0];
      data.idbar = bar.idBar;
      data.Nombre = bar.Nombre;
      data.Precio = bar.Precio;
      data.Cantidad = 1;
      console.log("bar", bar);
      vm.consumo.push(data);
    },

    async gbar() {
      await this.$axios
        .get("/bar")
        .then((response) => {
          this.bar = response.data;
        })
        .catch((error) => {
          console.log("error get");
        });
    },
  },
};
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

