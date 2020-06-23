<template lang="html">
  <div>
    <JsonEditor
      :key="`clips-${id}`"
      :value="value"
      @input="v => $emit('input', v)"
      :cssParams="{ height: '100px' }"
    />
  </div>
</template>

<script>
import JsonEditor from "./JsonEditor.vue";

export default {
  components: { JsonEditor },
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
    // },
    // watch: {
    //   value: {
    //     deep: true,
    //     handler() {
    //       this.$emit("input", this.value);
    //     }
    //   }
  }
};
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: 12px;
  border: 1px solid #eee;
  height: 100px;
  direction: ltr;
}
</style>
