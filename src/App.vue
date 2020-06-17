<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
    <Instrument @instrument="createInstrument" />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import Instrument from "./Instrument.vue";
import createSession from "./session.js";

export default {
  components: { PlayPauseButton, Instrument },
  data() {
    return {
      instrument: undefined,
      session: undefined
    };
  },
  methods: {
    tonePlayPause: function(play) {
      if (play) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    },
    createInstrument: function(instrument) {
      this.instrument = instrument;
    }
  },
  watch: {
    instrument: [
      function() {
        Tone.Transport.cancel();
        this.session = createSession(this.instrument);
      }
    ]
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
</style>
