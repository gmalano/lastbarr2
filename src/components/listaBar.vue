<template>
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

</template>

<script>
export default {
  name: "listaBar",
  props: ["bar", "consumo"],

  data() {
    return {
      text: "",
    };
  },

  computed: {
    map() {
      let vm = this;
      let sarray = vm.text.toUpperCase().trim().split(" ");
      let filtro = vm.bar;

      sarray.forEach((a) => {
        
        let bar = filtro.filter((bars) =>
          bars.Nombre.toUpperCase().includes(a)
        );
        filtro = bar;
      });
      return filtro;
    },
  },
  methods: {
    ArrayToObject(array, key) {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    },

    xgseleccionarbar(id) {
      let vm = this;
      //let cons0 = vm.consumo.filter((c) => c.idBar == id);
      let bar0 = vm.bar.filter((c) => c.idBar == id);

      console.log(cons0);
      let data = {};
      let bar = bar0[0];
      data.idbar = bar.idBar;
      data.Nombre = bar.Nombre;
      data.Precio = bar.Precio;
      data.Cantidad = 1;
      vm.consumo.push(data);
    },
    gseleccionarbar(id) {
      let vm = this;

      let bar0 = vm.bar.filter((c) => c.idBar === id);
      let idb = vm.consumo.findIndex((c) => c.idBar === id);

      if (idb > -1) {
        vm.consumo[idb].Cantidad++;
      } else {
        let bar = bar0[0];

        let obj = {
          idBar: bar.idBar,
          Nombre: bar.Nombre,
          Precio: bar.Precio,
          Cantidad: 1,
        };

        vm.consumo.push(obj);
      }
    },
  },
};
</script>

