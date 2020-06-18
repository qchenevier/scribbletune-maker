<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
    <Channel @channel="storeChannel" />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import Channel from "./Channel.vue";
import * as scribble from "scribbletune";

export default {
  components: { PlayPauseButton, Channel },
  data() {
    return {
      channel: undefined,
      session: undefined,
      sessionChannels: Array()
    };
  },
  methods: {
    tonePlayPause(play) {
      if (play) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    },
    storeChannel(channel) {
      this.channel = channel;
      this.createSession();
    },
    createSession() {
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
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
</style>
