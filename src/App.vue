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
    <div v-for="(container, id) in channels">
      <Channel
        :key="`channel-${container.id}`"
        v-model="container.channel"
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

function tonePlayPause(play) {
  if (play) {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
}

export default {
  components: { PlayPauseButton, Channel },
  data() {
    return {
      channels: {},
      toneInstruments: {},
      session: undefined
    };
  },
  methods: {
    tonePlayPause(play) {
      tonePlayPause(play);
    },
    addChannel() {
      let id = randomHash();
      var container = {
        id: id,
        channel: undefined
      };
      this.$set(this.channels, id, container);
    },
    removeChannel(id) {
      this.$delete(this.channels, id);
      this.createSession();
    },
    saveJson() {
      const serializedChannels = JSON.stringify(
        Object.values(this.channels).map(container => {
          return container.channel;
        }),
        null,
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
      this.toneInstruments = {};
      for (const [id, container] of Object.entries(this.channels)) {
        if (container.channel) {
          let instrument = container.channel.instrument;
          let clips = container.channel.clips;
          if (instrument.name && clips) {
            this.toneInstruments[id] = new Tone.PolySynth(
              Tone[instrument.name]
            );
            this.toneInstruments[id].set(instrument.params);
            let newSessionChannel = this.session.createChannel({
              idx: id,
              instrument: this.toneInstruments[id],
              clips: clips
            });
          }
        }
      }
      var clipIdx = 0;
      this.session.startRow(clipIdx);
    }
  },
  watch: {
    channels: {
      deep: true,
      handler() {
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
