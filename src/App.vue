<template>
  <div id="app">
    <input v-model="message" type="text" />
    <h2 class="message">{{ message }}</h2>
    <h3>Un autre message</h3>
    <PlayPauseButton @playPause="playPause" />
  </div>
</template>

<script>
import * as scribble from "scribbletune";
import PlayPauseButton from "./PlayPauseButton.vue";

const session = new scribble.Session();
const instrument = new Tone.Synth();
const channel = session.createChannel({
  idx: 0,
  instrument: instrument,
  clips: [
    {
      notes: "CM-3 ".repeat(4) + "DM7-3 ".repeat(4) + "GM-2 ".repeat(4),
      pattern: "[xx_-]".repeat(12)
    }
  ]
});

session.startRow(0);

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
  color: blue;
}
</style>
