import Vue from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import Buefy from "buefy";

Vue.use(Buefy);

new Vue({
  el: "#app",
  render: h => h(App)
});
