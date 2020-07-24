<template>
  <div id="app">
    <div>
      <h1>Scribbletune playground</h1>
      <SaveLoadJson v-model="channelsArray" />
      <Oscilloscope />
      <PlayPauseButton v-model="isPlaying" />
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
      session: undefined,
      isPlaying: false
    };
  },
  computed: {
    channelsArray: {
      get() {
        return Object.values(this.channels);
      },
      set(newChannelsArray) {
        newChannelsArray.map(this.addChannel);
      }
    },
    watchPropsForSessionRebuild() {
      return Object.values(this.channels)
        .filter(c => c)
        .map(c => {
          return {
            instrumentName: c?.instrument?.name,
            effectNames: c?.effects
              ? Object.values(c.effects).map(e => e?.name)
              : undefined,
            clips: c?.clips,
            offlineRendering: c?.offlineRendering,
            instrumentParams: c?.offlineRendering
              ? c?.instrument?.params
              : undefined,
            effectParams: c?.offlineRendering
              ? c?.effects
                ? Object.values(c.effects).map(e => e?.params)
                : undefined
              : undefined
          };
        });
    },
    watchInstrumentParamsForUpdate() {
      return Object.values(this.channels).map(c =>
        !c?.offlineRendering ? c?.instrument?.params : undefined
      );
    },
    watchEffectParamsForUpdate() {
      return Object.values(this.channels).map(c =>
        !c?.offlineRendering && c?.effects
          ? undefined
          : c?.effects
          ? Object.values(c.effects).map(e => e?.params)
          : undefined
      );
    }
  },
  methods: {
    tonePlayPause() {
      this.isPlaying ? Tone.Transport.start() : Tone.Transport.stop();
    },
    addChannel(channel) {
      let id = randomHash();
      this.$set(this.channels, id, channel);
    },
    removeChannel(id) {
      this.$delete(this.channels, id);
    },
    createToneEffects(id, channel) {
      function createEffect(effectName, idFull) {
        this.toneEffects[idFull] = new Tone[effectName]();
        return this.toneEffects[idFull];
      }
      let effects = channel?.effects
        ? Object.entries(channel.effects)
            .map(([idEffect, effect]) =>
              effect
                ? createEffect.bind(this)(effect.name, `${id}-${idEffect}`)
                : undefined
            )
            .filter(i => i)
        : undefined;
      return effects;
    },
    createChannel([id, channel]) {
      if (channel?.instrument?.name && channel?.clips) {
        this.toneInstruments[id] = new Tone.PolySynth(
          Tone[channel.instrument.name]
        );
        this.updateToneInstrumentsParams();
        const effects = this.createToneEffects(id, channel);
        this.updateToneEffectsParams();
        const channelParams = {
          idx: id,
          instrument: this.toneInstruments[id],
          clips: channel.clips,
          offlineRendering: channel.offlineRendering,
          effects: effects ? effects : []
        };
        this.session.createChannel(channelParams);
      }
    },
    createSession() {
      this.isPlaying = false;
      this.tonePlayPause(); // can't wait for the "isPlaying" watcher to be triggered, otherwise, offline rendered player have a huge offset.
      Tone.Transport.cancel();
      this.session = new scribble.Session();
      this.toneInstruments = {};
      this.toneEffects = {};
      Object.entries(this.channels).forEach(this.createChannel);
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
    watchPropsForSessionRebuild: {
      deep: true,
      handler() {
        this.createSession();
      }
    },
    watchInstrumentParamsForUpdate: {
      deep: true,
      handler() {
        this.updateToneInstrumentsParams();
      }
    },
    watchEffectParamsForUpdate: {
      deep: true,
      handler() {
        this.updateToneEffectsParams();
      }
    },
    isPlaying: {
      handler() {
        this.tonePlayPause();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
}
.column {
  float: left;
  width: 355;
}
</style>
