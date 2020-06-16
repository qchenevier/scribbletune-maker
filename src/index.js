import Vue from "vue";
import App from "./App.vue";

Tone.Master = Tone.Destination; // hack to use tone 14 with scribbletune

new Vue({
  el: "#app",
  render: h => h(App)
});
