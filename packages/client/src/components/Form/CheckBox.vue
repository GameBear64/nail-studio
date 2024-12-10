<script setup>
const props = defineProps(['label', 'errors']);
const model = defineModel();
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <div>
      <input
        :id="$attrs.name"
        v-bind="$attrs"
        type="hidden"
        value="false"
      >
      <label :for="$attrs.name">{{ label }}</label>
      <input
        v-model="model"
        type="checkbox"
        class="w-auto"
        v-bind="$attrs"
        value="true"
      >
    </div>
    <p class="text-error">
      {{ props.errors }}
    </p>
  </div>
</template>
