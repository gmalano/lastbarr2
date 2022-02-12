<template>
  <q-page padding>
      <div class="q-pa-md q-gutter-sm" padding>

        <q-avatar
        v-for="u in libres" :key="u.idMesa" padding
        clickable
        v-ripple
        @click.prevent="gseleccionarmesa(u.idMesa)"
        size="100px" font-size="52px" color="teal" text-color="white">
          {{ u.idMesa }}
        </q-avatar>

    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      libres: [],
      activo: 0
    };
  },

  created: function () {
    this.activo = localStorage.getItem("idUsuario");
    this.glibres();
  },

  methods: {
    glibres() {
      this.$axios
        .get("/mesaslibres")
        .then((response) => {
          this.libres = response.data;
        })
        .catch((error) => {
          console.log("error get");
        })
    },

     gseleccionarmesa(mesa)  {


      this.$axios
        .get(`/seleccionarmesa/${mesa}/${this.activo}`)
        .then((response) => {
          })
        .catch((error) => {
          console.log(error);
        });
         localStorage.setItem("idmesa", mesa)
         this.glibres()
    }
  }
}


</script>

