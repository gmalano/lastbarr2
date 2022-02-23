import { boot } from 'quasar/wrappers'

export default ({ Vue }) => {
  /*var os = require('os')
  var ifaces = os.networkInterfaces()
  var host = os.hostname()
  var axios = require('axios')
  var url = 'http://' + host + ':3000'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.baseURL = url

    (Vue.prototype.$APP_PHP = 'http://' + host + ':3000'),
    (Vue.prototype.$APP_USUARIO = ''),
    */
  //--------------------------------------------------------
  ;(Vue.prototype.$NOTIFY = function (text, color, ok) {
    this.$q.notify({
      progress: false,
      icon: ok ? 'done_outline' : 'warning',
      classes: 'glossy',
      position: 'center',
      timeout: 2500,
      message: text ? text : 'Error',
      actions: [{ icon: 'close', color: 'white' }],
      color: color ? color : 'red',
    })
  }),
    //--------------------------------------------------------
    (Vue.prototype.$ISCUIT = function (cuit) {
      let sCUIT = cuit.toString().replace('-', '').replace('-', '')
      if (sCUIT.length == 0) {
        return true
      }
      let aMult = '5432765432'.split('')

      if (sCUIT && sCUIT.length == 11) {
        let aCUIT = sCUIT.split('')
        var iResult = 0
        for (let i = 0; i <= 9; i++) {
          iResult += aCUIT[i] * aMult[i]
        }
        iResult = iResult % 11
        iResult = 11 - iResult
        if (iResult == 11) iResult = 0
        if (iResult == 10) iResult = 9

        if (iResult == aCUIT[10]) {
          this.errMsg = ''
          return true
        }
      }
      return false
    }),
    //--------------------------------------------------------
    (Vue.prototype.$EMPTY = function (e) {
      switch (e) {
        case '':
        case 0:
        case '0':
        case null:
        case false:
        case typeof e == 'undefined':
          return true
        default:
          return false
      }
    }),
    (Vue.prototype.$ISNULL = function (e, i) {
      return this.$EMPTY(e) ? i : e
    }),
    //--------------------------------------------------------

    (Vue.prototype.$FILTRA = function (datos, busca) {
      return datos.filter((item) => {
        for (let key in item) {
          if (
            item.hasOwnProperty(key) &&
            item[key].toString().toLowerCase().includes(busca.toLowerCase())
          ) {
            return true
          }
        }
        return false
      })
    }),
    (Vue.prototype.$MESASLIBRES = function () {
      let libres = []
      this.$axios
        .get('/mesaslibres')
        .then((response) => {
          libres = response.data
          this.$store.commit('setMesasLibres', libres.length)
          return libres
        })
        .catch((error) => {
          console.log('error glibres', error)
        })
    }),
    /*

   otro filtro {
    let COMB = this.COMBUSTIBLES.filter((comb) => comb.pesos != 0);
    //alert(JSON.stringify(COMB));
    return COMB;
  },



computed: {

  filteredPhotoFeed: function () {

    var photos = this.photoFeed;
    var authorNameSearchString = this.authorNameSearchString;

    if(!authorNameSearchString){
      return photos;
    }

    searchString = authorNameSearchString.trim().toLowerCase();

    photos = photos.filter(function(item){
      if(item.author.toLowerCase().indexOf(authorNameSearchString) !== -1){
        return item;
      }
    })

    return photos;
  }
}

    */

    //--------------------------------------------------------
    (Vue.prototype.$JSONESTRUCTURA = function (json) {
      var col = []
      for (var Skey in json[0]) {
        if (col.indexOf(Skey) === -1) {
          col.push({ field: Skey, title: Skey })
        }
      }
      return col
    }),
    //--------------------------------------------------------

    (Vue.prototype.$FORMDATA = function (obj) {
      let formData = new FormData()
      for (let key in obj) {
        formData.append(key, obj[key])
      }
      return formData
    }),
    //--------------------------------------------------------

    (Vue.prototype.$FIELDS = function (obj) {
      let field = ''
      for (let key in obj) {
        field = field + key + ','
      }
      return field.substring(0, field.length - 1)
    }),
    //--------------------------------------------------------

    (Vue.prototype.$GET_DATA = function (id) {
      let vm = this

      if (!id) {
        return
      }

      const options = {
        method: 'GET',
        params: {
          ID: id,
          TABLE: vm.TABLE,
          IDS: vm.ID,
          FIELDS: this.$FIELDS(vm.RECORDS),
        },
        url: '/get',
      }

      axios(options)
        .then(function (response) {
          vm.RECORDS = response.data[vm.TABLE][0]
          console.log('azios')
        })
        .catch(function (error) {
          console.log(error)
          vm.$NOTIFY('NO hay datos!!', 'red', 1)
        })
    }),
    //-----------------------------------------------------------------

    (Vue.prototype.$GET_SAVE0 = async function () {
      let vm = this
      let FORMDATA = vm.$FORMDATA(vm.RECORD, vm) // agrego los campos individuales
      FORMDATA.append('TABLE', vm.TABLE)
      FORMDATA.append('IDS', vm.ID)
      FORMDATA.append('FIELDS', vm.$FIELDS(vm.RECORD))
      FORMDATA.append('ID', vm.RECORD[vm.ID])

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: FORMDATA,
        url: vm.$APP_PHP + '/get_save.php',
      }

      await axios(options)
        .then(function (response) {
          vm.RECORDS = response.data[vm.TABLE][0]
          vm.$NOTIFY('Datos Grabados Correctamente!!', 'green', 1)
        })
        .catch(function (error) {
          vm.$NOTIFY('No se pueden Guardar los datos', 'red')
        })
    }),
    //*********************************************************//

    (Vue.prototype.$GET_SAVE = async function () {
      let vm = this
      let FORMDATA = vm.$FORMDATA(vm.RECORDS)
      FORMDATA.append('TABLE', vm.TABLE)
      FORMDATA.append('IDS', vm.ID)
      FORMDATA.append('FIELDS', vm.$FIELDS(vm.RECORDS))
      FORMDATA.append('ID', vm.RECORDS[vm.ID])
      const options = {
        method: 'post',
        headers: { 'Content-Type': 'application / x-www-form-urlencoded' },
        data: FORMDATA,
        url: '/get',
      }

      await axios(options)
        .then(function (response) {
          vm.RECORDS = response.data[vm.TABLE][0]
          if (!vm.RECORDS[vm.ID]) throw new Error('oops')
          vm.$NOTIFY('Datos Grabados Correctamente!!', 'green', 1)
          console.log(vm.RECORDS)
        })
        .catch(function (error) {
          vm.$NOTIFY('No se pueden Guardar los datos', 'red')
          console.log(error)
        })
    }),
    //-----------------------------------------------------------------
    (Vue.prototype.$GET_VALID = function (form) {
      let vm = this
      //let form = vm.$refs.form

      form.validate().then(function (ok) {
        if (ok) {
          vm.$GET_SAVE()
          vm.$GET_BLANK()
        } else {
          vm.$NOTIFY('Verifique los datos!!')
        }
      })
    }),
    //-----------------------------------------------------------------

    (Vue.prototype.$GET_BLANK = function () {
      this.BLANK = JSON.parse(JSON.stringify(this.RECORDS))
    }),
    //-----------------------------------------------------------------
    (Vue.prototype.$SET_BLANK = function (BLANK) {
      this.RECORD = JSON.parse(JSON.stringify())
      // this.RECORDS = BLANK
    })
  //-----------------------------------------------------------------
}
