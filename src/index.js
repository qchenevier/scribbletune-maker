import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import Buefy from "buefy";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(Buefy);

const router = new VueRouter({
  routes: [{ path: "/", name: "App", component: App }],
  base: "/"
});

new Vue({
  el: "#app",
  router
});
