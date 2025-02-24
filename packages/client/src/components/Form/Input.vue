<script setup>
import { useAttrs } from 'vue';

const props = defineProps(['errors']);
const model = defineModel();

const attrs = useAttrs();
const inputLabel = (attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1)).split('_').join(' ');
</script>

<template>
  <div>
    <label
      class="font-medium"
      :for="attrs.name"
    >{{ attrs.label?attrs.label:inputLabel }}</label>
    <input
      :id="attrs.name"
      v-bind="$attrs"
      v-model="model"
      :class="{ 'input-error': props?.errors }"
    >
    <p class="mt-1 h-4 text-sm font-medium leading-none text-red-600">
      {{ props.errors }}
    </p>
  </div>
</template>
