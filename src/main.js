// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import './assets/styles/index.scss';
import './assets/scripts/index';
// import './assets/demo.css';
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
import LightTimeline from 'vue-light-timeline';

//Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places,drawing,geometry" // necessary for places input
  }
});
Vue.use(LightTimeline);


//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
