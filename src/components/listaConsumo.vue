<template>
  <q-page>
    <div>
      <q-list padding>
        <q-item
          v-ripple
          v-for="(c, id) in consumo2"
          :key="id"
          style="width: 100%;"
        >
          <q-item-section no-wrap>
            <q-item-label>
              <q-chip
                floating
                text-color="white"
                color="teal"
                :label="c.Cantidad"
                class="shadow-1"
              />
              {{ c.Nombre }}
            </q-item-label>
          </q-item-section>

          <!-- <q-item-section no-wrap>
             <q-btn  :label="c.Nombre">
      <q-badge  color="red" floating >
      {{c.Cantidad}}
      </q-badge>
    </q-btn>
</q-item-section> -->

          <q-item-section side  style="width: 30%;">
            <q-btn
              v-ripple
              glossy
              color="primary"
              @click="masconsumo(id, 1)"
              style="width: 70%;"
              label="+"
            />
          </q-item-section>
          <q-item-section side  style="width: 20%;">
            <q-btn
              v-ripple
              glossy
              color="amber"
              @click="masconsumo(id, -1)"
              style="width: 70%;"
              label="-"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'listaConsumo',
  props: ['consumo'],
  //emits: ["update-cart"],

  data() {
    return {
      consumo2: this.consumo,
    }
  },

  computed: {},
  methods: {
    masconsumo(id, cant) {
      let vm = this
      vm.consumo2[id].Cantidad += cant
      if (vm.consumo2[id].Cantidad == 0) vm.consumo2.splice(id, 1)

      this.$emit('update-cart', 'hola updat')
    },
  },
}
</script>
