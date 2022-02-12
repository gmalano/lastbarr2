
 <template>
 <div>
 hola

 </div>
</template>
// <template>
//   <q-layout view="hHh lpR fFf">
//     <q-header elevated class="bg-primary text-white" height-hint="98">
//       <q-toolbar >
//         <q-btn flat to="/">
//         Home
//         </q-btn>



//         <q-space />
//         <q-tabs align="justify" shrink stretch>
//           <q-route-tab to="/page1" >
//             <q-avatar size="42px">
//               <img :src="require(`../Images/${idUsuario}.jpg`)" />
//             </q-avatar>

//           </q-route-tab>

//           <q-route-tab to="/page2" label="Mis Mesas" icon="alarm">
//             <q-badge color="purple" text-color="Libres" floating>{{
//               me()
//             }}</q-badge>
//           </q-route-tab>
//           <q-route-tab to="/page3" label="Libres" icon="movie" />



//         </q-tabs>
//       </q-toolbar>
//     </q-header>

//     <q-page-container>

//       <router-view />
//     </q-page-container>
//   </q-layout>
// </template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      search: "",

    };
  },
  computed: {
    idUsuario: function(){
    let l = localStorage.getItem("idUsuario")
    let v = this.$store.state.idUsuario

    let u = v?v:l
    this.$store.commit('setUsuario',  u );
    return u
      }
  },
  methods: {
    me() {
      return this.$store.state.misMesas
;
    },
  },
};
</script>
