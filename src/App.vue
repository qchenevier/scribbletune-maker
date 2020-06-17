<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="playPause" />
    <InstrumentChoice @choice="displayChoice" />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import InstrumentChoice from "./InstrumentChoice.vue";
import createSession from "./session.js";

const session = createSession();

export default {
  components: { PlayPauseButton, InstrumentChoice },
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
    },
    displayChoice: function(choice) {
      console.log(choice);
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
