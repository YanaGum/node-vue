import Vue from "vue";
import
BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from "./App.vue";
import router from "./router/index";
import store from "../src/vuex/store.js";

Vue.use(BootstrapVue)
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");