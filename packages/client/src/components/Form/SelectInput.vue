<script setup>
import { useAttrs } from "vue";

const props = defineProps(["options", "errors"]);
const model = defineModel();

const attrs = useAttrs();
const label = attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1);
</script>

<template>
  <div>
    <label class="font-medium" :for="$attrs.name">{{
      label.split("_").join(" ")
    }}</label>
    <select
      v-bind="$attrs"
      :id="$attrs.name"
      v-model="model"
      v-for="{ option, value } in options"
    >
      <option :value="value">{{ option }}</option>
    </select>
    <p class="text-error">
      {{ props.errors }}
    </p>
  </div>
</template>
