<template>
  <div id="app">
    <div>
      <h1>Scribbletune playground</h1>
      <PlayPauseButton @playPause="tonePlayPause" />
      <button @click="addChannel">
        Add channel
      </button>
      <button @click="saveJson">
        Save JSON
      </button>
    </div>
    <div>
      <Channel
        v-for="(channel, index) in channels"
        :key="`channel-${index}`"
        @channel="storeChannel"
        @close="removeChannel"
      />
    </div>
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import Channel from "./Channel.vue";
import * as scribble from "scribbletune";
import { saveAs } from "file-saver";

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export default {
  components: { PlayPauseButton, Channel },
  data() {
    return {
      channels: {},
      session: undefined,
      sessionChannels: {}
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
    addChannel() {
      let index = randomHash();
      this.$set(this.channels, index, undefined);
    },
    removeChannel(index) {
      this.$delete(this.channels, index);
      this.$delete(this.sessionChannels, index);
      this.createSession();
    },
    storeChannel(channel, index) {
      this.channels[index] = channel;
      this.createSession();
    },
    saveJson() {
      function filterToneInstrument(name, value) {
        if (name == "toneInstrument") {
          return undefined;
        } else {
          return value;
        }
      }
      const serializedChannels = JSON.stringify(
        Object.values(this.channels),
        filterToneInstrument,
        2
      );
      var blob = new Blob([serializedChannels], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "scribbletune-playground-save.json");
    },
    createSession() {
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      for (const [index, channel] of Object.entries(this.channels)) {
        if (channel) {
          if (channel.toneInstrument && channel.clips) {
            let newSessionChannel = this.session.createChannel({
              idx: channel.id,
              instrument: channel.toneInstrument,
              clips: channel.clips
            });
            this.$set(this.sessionChannels, index, newSessionChannel);
          }
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
