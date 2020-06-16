<template>
  <div id="app">
    <input v-model="message" type="text" />
    <h2 class="message">{{ message }}</h2>
    <h3>Un autre message...</h3>
  </div>
</template>

<script>
import * as scribble from "scribbletune";

export default {
  data() {
    return {
      message: "Hello World"
    };
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>
