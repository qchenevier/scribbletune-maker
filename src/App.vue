<template>
  <div id="app">
    <div>
      <h1>Scribbletune playground</h1>
      <SaveLoadJson v-model="channelsArray" />
      <Oscilloscope />
      <PlayPauseButton @playPause="tonePlayPause" />
      <button @click="() => addChannel()">
        Add channel
      </button>
    </div>
    <div v-for="(channel, id) in channels">
      <Channel
        :key="`channel-${id}`"
        v-model="channels[id]"
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
import Oscilloscope from "./Oscilloscope.vue";
import SaveLoadJson from "./SaveLoadJson.vue";

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export default {
  components: { PlayPauseButton, Channel, Oscilloscope, SaveLoadJson },
  data() {
    return {
      channels: {},
      toneInstruments: {},
      toneEffects: {},
      session: undefined
    };
  },
  computed: {
    channelsArray: {
      get() {
        return Object.values(this.channels);
      },
      set(channelsArray) {
        channelsArray.map(this.addChannel);
      }
    },
    channelsInstrumentName() {
      return Object.values(this.channels).map(c => c?.instrument?.name);
    },
    channelsInstrumentParams() {
      return Object.values(this.channels).map(c => c?.instrument?.params);
    },
    channelsClips() {
      return Object.values(this.channels).map(c => c?.clips);
    },
    channelsEffectName() {
      return Object.values(this.channels).map(c =>
        c?.effects ? Object.values(c.effects).map(e => e?.name) : undefined
      );
    },
    channelsEffectParams() {
      return Object.values(this.channels).map(c =>
        c?.effects ? Object.values(c.effects).map(e => e?.params) : undefined
      );
    }
  },
  methods: {
    tonePlayPause(play) {
      play ? Tone.Transport.start() : Tone.Transport.stop();
    },
    addChannel(channel) {
      let id = randomHash();
      this.$set(this.channels, id, channel);
    },
    removeChannel(id) {
      this.$delete(this.channels, id);
    },
    createSession() {
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      this.toneInstruments = {};
      this.toneEffects = {};
      Object.entries(this.channels).forEach(([id, channel]) => {
        if (channel?.instrument?.name && channel?.clips) {
          this.toneInstruments[id] = new Tone.PolySynth(
            Tone[channel.instrument.name]
          );
          let effects = Object.entries(channel.effects)
            .map(([idEffect, effect]) => {
              if (effect) {
                let idFull = `${id}-${idEffect}`;
                this.toneEffects[idFull] = new Tone[effect.name]();
                return this.toneEffects[idFull];
              }
            })
            .filter(i => i);
          let channelParameters = {
            idx: id,
            instrument: this.toneInstruments[id],
            clips: channel.clips
          };
          if (effects.length) {
            channelParameters.effects = effects;
          }
          this.session.createChannel(channelParameters);
        }
      });
      var clipIdx = 0;
      this.session.startRow(clipIdx);
    },
    updateToneInstrumentsParams() {
      Object.entries(this.channels).forEach(([id, channel]) => {
        if (channel?.instrument?.params && this.toneInstruments[id]) {
          this.toneInstruments[id].set(channel.instrument.params);
        }
      });
    },
    updateToneEffectsParams() {
      Object.entries(this.channels).forEach(([id, channel]) => {
        if (channel) {
          Object.entries(channel.effects).forEach(([idEffect, effect]) => {
            let idFull = `${id}-${idEffect}`;
            if (effect?.params && this.toneEffects[idFull]) {
              this.toneEffects[idFull].set(effect.params);
            }
          });
        }
      });
    }
  },
  watch: {
    channels() {
      this.createSession();
    },
    channelsInstrumentName() {
      this.createSession();
    },
    channelsInstrumentParams: {
      deep: true,
      handler() {
        this.updateToneInstrumentsParams();
      }
    },
    channelsEffectName() {
      this.createSession();
    },
    channelsEffectParams: {
      deep: true,
      handler() {
        this.updateToneEffectsParams();
      }
    },
    channelsClips: {
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
.column {
  float: left;
  width: 355;
}
</style>
