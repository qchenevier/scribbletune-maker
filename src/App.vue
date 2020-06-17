<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="playPause" />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import createSession from "./session.js";

const session = createSession();

export default {
  components: { PlayPauseButton },
  data() {
    return {
      message: "Hello World"
    };
  },
  methods: {
    playPause: function(play) {
      if (play) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    }
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
</style>
