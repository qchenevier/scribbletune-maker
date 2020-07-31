<template>
  <b-button
    rounded
    size="is-small"
    :type="this.value ? 'is-dark' : 'is-success'"
    @click="toggle"
    :loading="this.rendering"
    outlined
    :icon-left="this.value ? 'pause' : 'play'"
  >
    {{ this.value ? "Pause" : "Play" }}
  </b-button>
</template>

<script>
export default {
  props: { value: { default: false }, rendering: { default: false } },
  methods: {
    toggle: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style></style>
