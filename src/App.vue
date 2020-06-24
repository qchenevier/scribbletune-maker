<template>
  <div id="app">
    <div>
      <h1>Scribbletune playground</h1>
      <VueP5 @setup="setup" @draw="draw" />
      <PlayPauseButton @playPause="tonePlayPause" />
      <button @click="() => addChannel()">
        Add channel
      </button>
      <input type="file" id="file" @change="loadJson" multiple />
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
import VueP5 from "vue-p5";

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
  components: { PlayPauseButton, Channel, VueP5 },
  data() {
    return {
      channels: {},
      toneInstruments: {},
      session: undefined,
      mic: undefined,
      analyzer: undefined,
      fft: undefined,
      meter: undefined
    };
  },
  methods: {
    tonePlayPause(play) {
      tonePlayPause(play);
    },
    setup(sketch) {
      sketch.createCanvas(550, 100);
      this.analyzer = new Tone.Waveform(2048);
      this.fft = new Tone.FFT(1024);
      Tone.Destination.connect(this.analyzer);
      Tone.Destination.connect(this.fft);
      sketch.noFill();
    },
    draw(sketch) {
      sketch.background(255);
      let width = 550;
      let height = 100;
      let waveform = this.analyzer.getValue();
      let spectrum = this.fft.getValue();

      // spectrum
      sketch.noStroke();
      sketch.fill("rgba(0, 100, 255, 0.3)");
      sketch.beginShape();
      sketch.vertex(0, height);
      for (let i = 0; i < spectrum.length; i++) {
        sketch.vertex(
          sketch.map(sketch.log(i), 0, sketch.log(spectrum.length), 0, width),
          sketch.map(spectrum[i], -127, 0, height, 0)
        );
      }
      sketch.vertex(width, height);
      sketch.endShape();

      // waveform
      sketch.noFill();
      sketch.stroke("rgba(0, 100, 255, 0.7)");
      sketch.strokeWeight(1.5);
      sketch.beginShape();
      let trigger = 0;
      let firstPos = 0;
      // draw points starting from first positive non-zero value
      for (var i = 0; i < waveform.length; i++) {
        if (waveform[i] > 0 && waveform[i - 1] <= 0 && trigger == 0) {
          trigger = 1;
          firstPos = i;
        }
        if (trigger == 1) {
          sketch.vertex(
            sketch.map(i - firstPos, 0, waveform.length, 0, width * 1.3),
            sketch.map(waveform[i], -1, 1, height, 0)
          );
        }
      }
      // draw points if nothing drawn
      if (trigger == 0) {
        for (var i = 0; i < waveform.length; i++) {
          sketch.vertex(
            sketch.map(i, 0, waveform.length, 0, width * 1.3),
            sketch.map(waveform[i], -1, 1, height, 0)
          );
        }
      }
      sketch.endShape();
    },
    addChannel(channel) {
      let id = randomHash();
      var container = {
        id: id,
        channel: channel
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
    loadJson(event) {
      var reader = new FileReader();
      // arrow function to access component methods from inside FileReader
      // see https://stackoverflow.com/questions/40707738/vuejs-accessing-a-method-from-another-method#comment77209572_40708474
      reader.onload = event => {
        var channels = JSON.parse(event.target.result);
        channels.forEach(this.addChannel);
      };
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        reader.readAsText(files[i]);
      }
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
.column {
  float: left;
  width: 355;
}
</style>
