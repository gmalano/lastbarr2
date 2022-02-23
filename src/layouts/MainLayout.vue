<template>
  <q-layout view="hHh lpR fFf">
    <q-page>
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat to="/">Home</q-btn>

          <q-space />
          <q-tabs align="justify" shrink stretch>
            <!-- <q-route-tab to="/page1">
            <q-avatar size="42px">
              <img :src="require(`../images/${idUsuario}.jpg`)" />
            </q-avatar>
          </q-route-tab> -->

            <q-btn-dropdown auto-close stretch flat>
              <template v-slot:label>
                <div>
                  <q-avatar size="42px">
                    <img
                      :src="require(`../images/${idUsuario}.jpg`)"
                      v-if="idUsuario"
                    />
                  </q-avatar>
                </div>
              </template>

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
            </q-btn-dropdown>

            <q-space />

            <q-route-tab to="/page2" label="Libres" icon="alarm">
              <q-badge color="purple" text-color="Libres" floating>
                {{ me() }}
              </q-badge>
            </q-route-tab>
            <q-space />
            <q-route-tab to="/page3" label="Mis Mesas" icon="movie" />
          </q-tabs>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <!-- <router-view /> -->
        <router-view :key="$route.fullPath"></router-view>

        <q-page-sticky position="bottom-left" :offset="[18, 18]">
          <q-btn
            fab
            icon="logout"
            color="red"
            name="closeApp"
            @click="closeapp"
          />
        </q-page-sticky>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

//
<script>
import { useQuasar } from 'quasar'
//const { ipcMain } = require('electron')

export default {
  name: 'PageIndex',
  data() {
    return {
      search: '',
      activo: 0,
    }
  },

  created: function () {
    this.gusuarios()
    this.activo = this.$store.state.idUsuario //localStorage.getItem("idUsuario");
    //this.$dialog("hola","cancela").then(ok => alert(ok)).catch(ok => alert("no -->"+ok))
  },

  computed: {
    idUsuario: function () {
      let l = localStorage.getItem('idUsuario')
      let v = this.$store.state.idUsuario
      let u = v ? v : l
      u = u ? u : 0
      this.$store.commit('setUsuario', u)

      return u
    },
  },
  methods: {
    closeapp() {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.close()
      }
    },
    me() {
      return this.$store.state.MesasLibres
    },

    selectItem(id) {
      this.$store.commit('setUsuario', id)
      localStorage.setItem('idUsuario', id)

      this.activo = id
    },

    gusuarios() {
      let vm = this
      //$NOTIFY(1)
      this.$axios
        .get('usuarios')
        .then((response) => {
          this.usuarios = response.data
          this.error = response
          this.usuarios.shift()
        })
        .catch((error) => {
          console.log('error gusuarios', error)
        })
    },
  },
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: teal
</style>
