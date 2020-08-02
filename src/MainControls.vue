<template>
  <div>
    <KeyPress
      key-event="keydown"
      :key-code="32"
      :modifiers="['shiftKey']"
      @success="$emit('toggleVariable', 'isPlaying')"
    />
    <div class="level">
      <div class="level-left container is-fluid">
        <b-button
          rounded
          size="is-small"
          :type="this.isPlaying ? 'is-dark' : 'is-link'"
          @click="$emit('toggleVariable', 'isPlaying')"
          :loading="this.isRendering"
          :icon-left="this.isPlaying ? 'pause' : 'play'"
        />
        <b-button
          rounded
          size="is-small"
          :type="this.isAutoReplay ? 'is-link' : ''"
          @click="$emit('toggleVariable', 'isAutoReplay')"
          outlined
          icon-left="step-forward"
        />
        <b-button
          rounded
          icon-left="plus"
          size="is-small"
          @click="$emit('addChannel')"
        >
          Add channel
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import KeyPress from "vue-keypress";

export default {
  components: { KeyPress },
  props: {
    isPlaying: { default: false },
    isRendering: { default: false },
    isAutoReplay: { default: false }
  }
};
</script>

<style></style>
