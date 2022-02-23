<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{text}}</div>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="alert" v-close-popup @click="okx=true" v-if="cancelar"/>
        <q-btn flat label="OK" color="primary" v-close-popup @click="okx=false" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'dialogo',
  props: ["text", "cancelar", "ok" ],


  data() {
    return {
      modelx: this.model,
      oks :this.ok
    }
  },
  computed: {},
}
</script>
