<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
    <InstrumentChoice @choice="createInstrument" />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import InstrumentChoice from "./InstrumentChoice.vue";
import createSession from "./session.js";

export default {
  components: { PlayPauseButton, InstrumentChoice },
  data() {
    return {
      instrument: undefined,
      instrumentParams: undefined,
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
    createInstrument: function(instrumentName) {
      let instrumentTemplate = new Tone[instrumentName]();
      this.instrumentParams = instrumentTemplate.get();
      this.instrument = new Tone[instrumentName](this.instrumentParams);
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
