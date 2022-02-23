
import { Loading, QSpinnerGears, Notify } from 'quasar'

import axios from 'axios'



  
    const $alert = () => { 
      Notify.create('Danger, Will Robinsonwwwwwwwwwwwwwwwwww! Danger!')
      }
    


      export default boot(({ app }) => {
        
        app.config.globalProperties.$alert = $alert
        
      })


      
      