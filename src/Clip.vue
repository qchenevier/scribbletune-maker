<template lang="html">
  <ParamsEditor
    :key="`clips-${id}`"
    :value="value"
    @input="v => $emit('input', v)"
    height="100px"
  />
</template>

<script>
import ParamsEditor from "./ParamsEditor.vue";

export default {
  components: { ParamsEditor },
  props: {
    value: {
      default() {
        return [
          {
            notes: "CM-3 CM-3 DM7-3 DM7-3 GM-2 GM-2",
            pattern: "[xx_-][xx_-][xx_-]"
          }
        ];
      }
    }
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

<style scoped></style>
