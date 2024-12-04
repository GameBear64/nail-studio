<script setup>
import { useAttrs } from "vue";

const props = defineProps(["errors"]);
const model = defineModel();

const attrs = useAttrs();
const label = attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1);
</script>

<template>
  <div>
    <label class="font-medium" :for="attrs.name">{{
      label.split("_").join(" ")
    }}</label>
    <input
      :id="attrs.name"
      v-bind="$attrs"
      :class="{ 'input-error': props?.errors }"
      v-model="model"
    />
    <p class="text-red-600 leading-none text-sm h-4 mt-1 font-medium">
      {{ props.errors }}
    </p>
  </div>
</template>
