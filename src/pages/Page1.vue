<template>
  <q-page padding>
     <div style="max-width: 400px">
    <q-list padding>
      <q-item
        clickable
        v-ripple
        v-for="u in usuarios"
        :key="u.idUsuario"
        @click.prevent="selectItem(u.idUsuario)"
        :active="activo == u.idUsuario"
        active-class="my-menu-link"
      >
        <q-item-section>
          <div>
            <q-avatar>
              <img :src="require(`../images/${u.idUsuario}.jpg`)" />
            </q-avatar>
            {{ u.Usuario }}
          </div>
        </q-item-section>
      </q-item>
    </q-list>
     </div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn :ripple="{ center: true }" color="secondary" label="borrar mesas" no-caps    @click.prevent="gborrarmesas()"/>
  </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      idUsuario: 0,
      activo: 0,
      error: "",
    };
  },

  created: function () {
    this.gusuarios();
    this.activo = this.$store.state.idUsuario //localStorage.getItem("idUsuario");
  },

  methods: {
    selectItem(id) {

      this.$store.commit('setUsuario',  id );
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
          console.log("error .get(/usuarios) ");
        });
    },
 gborrarmesas() {
   this.$axios
        .get("/borrarmesas")
        .then((response) => {
          storage.removeItem("idUsuario");
          storage.removeItem("idorden");

          })
        .catch((error) => {
          console.log("error .get(/usuarios) ");
        });
    },

          },
};
</script>

// // localStorage.getItem('cats') // localStorage.removeItem('cats') // //
localStorage.setItem('cats', parsed)

<style lang="sass">
.my-menu-link
  color: white
  background: teal
</style>
