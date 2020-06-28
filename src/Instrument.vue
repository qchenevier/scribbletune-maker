<template lang="html">
  <div>
    <select v-model="input.name">
      <option v-for="n in names" :value="n">{{ n }} </option>
    </select>
    <button v-if="closeButton" @click="$emit('close', id)">Close</button>
    <JsonEditor
      :key="`instrument-editor-${id}`"
      v-model="input.params"
      :height="height"
    />
  </div>
</template>

<script>
import JsonEditor from "./JsonEditor.vue";

export default {
  components: { JsonEditor },
  props: {
    value: undefined,
    names: undefined,
    height: { default: "300px" },
    closeButton: { default: false }
  },
  data() {
    return {
      input: this.value
    };
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    },
    cssParams() {
      return {
        fontSize: "12px",
        height: this.height,
        border: "1px solid #eee"
      };
    }
  },
  created() {
    if (!this.input) {
      this.input = {
        name: this.names[0],
        params: new Tone[this.names[0]]().get()
      };
    }
  },
  mounted() {
    this.$emit("input", this.input);
  },
  watch: {
    "input.name": {
      handler() {
        this.input.params = new Tone[this.input.name]().get();
      }
    },
    input: {
      deep: true,
      handler() {
        this.$emit("input", this.input);
      }
    }
  }
};
</script>

<style scoped></style>
