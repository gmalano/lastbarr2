'use strict'
import { boot } from 'quasar/wrappers'
import { Loading, QSpinnerGears, Notify, Dialog } from 'quasar'

import axios from 'axios'

//import path from 'path'
//import process from 'process'

/****************************************************************************/
//let url = 'http://' + process.env.USERDOMAIN + ':3000/'
//let url = 'http://192.168.1.2:3000/'

const $url = window.location.hostname

const $axios = axios.create({
  baseURL: `https://${$url}:3000`,
})

/****************************************************************************/
const $alert = (text, color, ok) => {
  Notify.create({
    icon: ok ? 'done_outline' : 'warning',
    type: 'positive',
    position: 'center',
    classes: 'glossy',
    timeout: 2500,
    message: text ? text : 'Error',
    actions: [{ icon: 'close', color: 'white' }],
    color: color ? color : 'red',
  })
}

// /****************************************************************************/
// const $dialog = (text, cancel) => {
//   Dialog.create({
//     title: 'Confirmar',
//     message: text,
//     cancel: cancel,
//     persistent: true,
//   })
//     .onOk(() => {
//       return 1
//     })
//     .onCancel(() => {
//       return 0
//     })
//     .onDismiss(() => {
//       return 0
//     })
// }

// /****************************************************************************/

// async function $dialog(text, cancel) {
//   let ok0 = 0
//   await $dialog0(text, cancel).then((ok) => (ok0 = ok))
//   return ok0
// }

function $dialog(text, cancel) {
  return new Promise((resolve, reject) => {
    const dialog = (text, cancel) => {
      Dialog.create({
        title: 'Confirmar',
        message: text,
        cancel: cancel,
        persistent: true,
      })
        .onOk(() => {
          resolve(1)
        })
        .onCancel(() => {
          reject(0)
        })
    }
    dialog(text, cancel)

    //
  })
}

/****************************************************************************/

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = $axios
  app.config.globalProperties.$alert = $alert
  app.config.globalProperties.$dialog = $dialog
  app.config.globalProperties.$url = $url
})

export { $axios }
