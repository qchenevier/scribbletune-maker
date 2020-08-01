<template>
  <div>
    <b-button
      rounded
      size="is-small"
      :type="this.value ? 'is-dark' : 'is-link'"
      @click="toggle"
      :loading="this.rendering"
      :icon-left="this.value ? 'pause' : 'play'"
    />
  </div>
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
