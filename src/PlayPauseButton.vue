<template>
  <button :class="this.value ? 'pause' : 'play'" @click="toggle">
    {{ this.value ? "Pause" : "Play" }}
  </button>
</template>

<script>
export default {
  props: { value: { default: false } },
  methods: {
    toggle: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style>
.play {
  color: green;
}

.pause {
  color: grey;
}
</style>
