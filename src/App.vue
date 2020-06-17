<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
    <Clip @clips="createClip" />
    <Instrument @instrument="createInstrument" />
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
        instrument: undefined
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
    createInstrument: function(instrument) {
      this.channel.instrument = instrument;
    },
    createClip: function(clips) {
      this.channel.clips = clips;
    },
    createSession: function() {
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      var channelIdx = 0;
      if (this.channel.instrument && this.channel.clips) {
        this.sessionChannels[channelIdx] = this.session.createChannel({
          idx: channelIdx,
          instrument: this.channel.instrument,
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
    "channel.instrument": {
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
