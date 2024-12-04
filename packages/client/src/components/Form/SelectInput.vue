<script setup>
import { useAttrs } from "vue";

const props = defineProps(["options", "errors"]);
const model = defineModel();

const attrs = useAttrs();
const name = attrs.name.split("_").join(" ");
const label = name.charAt(0).toUpperCase() + name.slice(1);
</script>

<template>
  <div>
    <label class="font-medium" :for="name">{{ label }}</label>
    <select
      v-bind="$attrs"
      :id="name"
      v-model="model"
      :name="name"
      v-for="{ option, value } in options"
    >
      <option :value="value">{{ option }}</option>
    </select>
    <p class="text-error">
      {{ props.errors }}
    </p>
  </div>
</template>
