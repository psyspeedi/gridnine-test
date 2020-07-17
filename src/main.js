import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import currencyFilter from './filter/currency.filter'
import timeDurationFilter from './filter/timeDuration.filter'
import timeFilter from './filter/time.filter'
import dateFilter from './filter/date.filter'
Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)
Vue.filter('duration', timeDurationFilter)
Vue.filter('time', timeFilter)
Vue.filter('date', dateFilter)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
