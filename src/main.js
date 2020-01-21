import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// import FastClick from 'fastclick'
import IconSvg from 'components/public/IconSvg'
import 'lib-flexible'
import 'utils/permission'
import '@/style/common.scss'
import '@/de.env'
import * as filters from 'utils/filters'
import { ImagePreview, Lazyload } from 'vant'
import VueCookies from 'vue-cookies'


// FastClick.attach(document.body)

Vue.component('IconSvg', IconSvg)

Vue.config.productionTip = false

Vue.use(ImagePreview)
Vue.use(Lazyload)
Vue.use(VueCookies)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
