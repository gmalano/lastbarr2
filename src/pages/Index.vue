<template>
  <q-page class="flex column" >

<div   style="font-size: 30vh; text-align: center">404</div>

      <div class="text-h2 " style=" opacity: 0.4 ;text-align: center">Oops. Nothing here...</div>

      <div class="col skyline"></div>

  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>

<!-- <style lang="sass" >
.q-page
  background: #136a8a
  //background: -webkit-linear-gradient(to bottom, red, #136a8a)
  background: linear-gradient(to bottom, blue, #136a8a)
  color: white


.q-page .skyline
  flex: 0 0 100px
  background: url(../assets/skyline.png)
  background-size: contain
  background-position:  top right
</style> -->

