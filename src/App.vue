<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
    <Clip @clips="storeClips" />
    <Instrument
      @instrument="storeInstrument"
      @toneInstrument="storeToneInstrument"
    />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import Instrument from "./Instrument.vue";
import Clip from "./Clip.vue";
import * as scribble from "scribbletune";

export default {
  components: { PlayPauseButton, Instrument, Clip },
  data() {
    return {
      channel: {
        clips: undefined,
        instrument: undefined,
        toneInstrument: undefined
      },
      session: undefined,
      sessionChannels: Array()
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
    storeInstrument: function(instrument) {
      this.channel.instrument = instrument;
    },
    storeToneInstrument: function(toneInstrument) {
      this.channel.toneInstrument = toneInstrument;
    },
    storeClips: function(clips) {
      this.channel.clips = clips;
    },
    createSession: function() {
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      var channelIdx = 0;
      if (this.channel.toneInstrument && this.channel.clips) {
        this.sessionChannels[channelIdx] = this.session.createChannel({
          idx: channelIdx,
          instrument: this.channel.toneInstrument,
          clips: this.channel.clips
        });
      }
      var clipIdx = 0;
      this.session.startRow(clipIdx);
    }
  },
  watch: {
    "channel.clips": {
      deep: true,
      handler: function() {
        this.createSession();
      }
    },
    "channel.toneInstrument": {
      handler: function() {
        this.createSession();
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
