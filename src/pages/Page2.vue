<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm" padding>
      <q-avatar
        v-for="u in libres"
        :key="u.idMesa"
        padding
        clickable
        v-ripple
        @click.prevent="gseleccionarmesa(u.idMesa)"
        size="100px"
        font-size="52px"
        color="teal"
        text-color="white"
      >
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
      activo: 0,
    };
  },

  created: function () {
    // this.activo = localStorage.getItem("idUsuario");
    this.activo = this.$store.state.idUsuario;
    this.glibres();
    //this.miip();
  },

  methods: {
    glibres() {
      
      this.$axios
        .get("/mesaslibres")
        .then((response) => {
          this.libres = response.data;
          this.$store.commit("setMesasLibres", this.libres.length);
        })
        .catch((error) => {
          console.log("error glibres", error);
        });
    },

    xglibres() {
      alert(this.$MESASLIBRES);
      //this.libres.push( this.$MESASLIBRES)
    },

    async miip() {
      const URL_API = "localhost";
      let respuestaRaw = await fetch(URL_API);
      let respuesta = respuestaRaw.url.slice(0, -URL_API.length);
      console.log(respuesta);
      //let ip = respuesta.ip;
      //console.log(ip);
    },
    gseleccionarmesa(mesa) {
      let vm = this;
      this.$axios
        .get(`/seleccionarmesa/${mesa}/${this.activo}`)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      localStorage.setItem("idmesa", mesa);
      this.glibres();
    },
  },
};
</script>
