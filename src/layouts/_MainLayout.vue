<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn flat to="/"> Home </q-btn>

        <q-space />
        <q-tabs align="justify" shrink stretch>
          <q-route-tab to="/page1">
            <q-avatar size="42px">
              <img :src="require(`../images/${idUsuario}.jpg`)" />
            </q-avatar>
          </q-route-tab>
          <q-route-tab to="/page2" label="Mis Mesas" icon="alarm">
            <q-badge color="purple" text-color="Libres" floating>{{
              me()
            }}</q-badge>
          </q-route-tab>
          <q-route-tab to="/page3" label="Libres" icon="movie" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

//
<script>
export default {
  name: "PageIndex",
  data() {
    return {
      search: "",
      usuarios: [],
      xidUsuario: 0,
      activo: 0,
      error: "",
    };
  },
  created: function () {
    this.gusuarios();
    this.activo = this.$store.state.idUsuario; //localStorage.getItem("idUsuario");
    this.idUsuario = this.gUsuario();
  },

  methods: {
    gUsuario: function () {
      let l = localStorage.getItem("idUsuario");
      let v = this.$store.state.idUsuario;
      let u = v ? v : l;
      this.$store.commit("setUsuario", u);

      return u;
    },
    me() {
      //       return this.$store.state.misMesas

      return 0;
    },
    selectItem(id) {
      this.$store.commit("setUsuario", id);
      localStorage.setItem("idUsuario", id);
      this.activo = id;
    },

    gusuarios() {
      this.$axios
        .get("usuarios")
        .then((response) => {
          this.usuarios = response.data;
          this.error = response;
        })
        .catch((error) => {
          console.log("error gusuarios", error);
        });
    },
  },
};
</script>
