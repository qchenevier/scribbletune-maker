<template>
  <div id="app">
    <div>
      <h1>Scribbletune playground</h1>
      <PlayPauseButton @playPause="tonePlayPause" />
    </div>
    <div>
      <Channel id="0" @channel="storeChannel" />
      <Channel id="1" @channel="storeChannel" />
    </div>
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
      channels: [],
      session: undefined,
      sessionChannels: []
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
      this.channels[channel.id] = channel;
      this.createSession();
    },
    createSession() {
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      for (const channel of this.channels) {
        if (channel.toneInstrument && channel.clips) {
          this.sessionChannels[channel.id] = this.session.createChannel({
            idx: channel.id,
            instrument: channel.toneInstrument,
            clips: channel.clips
          });
        }
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
