<template>
  <VueP5 @setup="setup" @draw="draw" />
</template>

<script>
import VueP5 from "vue-p5";

export default {
  components: { VueP5 },
  data() {
    return {
      mic: undefined,
      analyzer: undefined,
      fft: undefined,
      meter: undefined
    };
  },
  methods: {
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
    }
  }
};
</script>
